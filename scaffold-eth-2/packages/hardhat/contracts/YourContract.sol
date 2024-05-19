// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract YourContract {
	address public owner;
	address payable[] public users;
	mapping(address => uint) public points;

	event PointsIssued(address indexed to, uint amount);
	event PointsTransferred(
		address indexed from,
		address indexed to,
		uint amount
	);
	event PointsRedeemed(address indexed from, uint amount);

	constructor() {
		owner = msg.sender;
	}

	modifier onlyOwner() {
		require(
			msg.sender == owner,
			"Only the contract owner can perform this action"
		);
		_;
	}

	modifier onlyUser() {
		require(
			isUserInArray(msg.sender),
			"Only registered users can perform this action"
		);
		_;
	}

	function getAddress() public view returns (address) {
		return address(this);
	}

	//linear search, inefficient way to do this
	function isUserInArray(address user) internal view returns (bool) {
		for (uint i = 0; i < users.length; i++) {
			if (users[i] == user) {
				return true;
			}
		}
		return false;
	}

	function join() public payable {
		require(msg.value > .01 ether);

		//adds user into user list
		users.push(payable(msg.sender));
	}

	function issuePoints(address customer, uint amount) public onlyOwner {
		points[customer] += amount;
		emit PointsIssued(customer, amount);
	}

	function transferPoints(address to, uint amount) public {
		address from = msg.sender;
		require(points[from] >= amount, "Insufficient points to transfer");

		points[from] -= amount;
		points[to] += amount;

		emit PointsTransferred(from, to, amount);
	}

	function redeemPoints(uint amount) public {
		address customer = msg.sender;
		require(points[customer] >= amount, "Insufficient points to redeem");

		points[customer] -= amount;

		emit PointsRedeemed(customer, amount);
	}
}
