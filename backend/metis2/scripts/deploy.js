async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const Rewards = await ethers.getContractFactory("Rewards");
    const rewards = await Rewards.deploy();
  
    console.log("Waiting for transaction to be mined...");
    await rewards.deployed(); // Wait for the transaction to be mined
  
    console.log("Rewards deployed to:", rewards.address);

    const result = await contract.myFunction(); // Replace `myFunction` with your actual function name
    console.log("Function result:", result);
  
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error deploying contract:", error);
      process.exit(1);
    });