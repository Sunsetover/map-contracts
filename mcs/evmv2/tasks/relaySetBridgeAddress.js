
module.exports = async (taskArgs,hre) => {
    const accounts = await ethers.getSigners()
    const deployer = accounts[0];

    console.log("deployer address:",deployer.address);

    let proxy = await hre.deployments.get("MAPOmnichainServiceProxy")

    let mcssRelayProxy = await ethers.getContractAt('MAPOmnichainServiceRelay',proxy.address);


    await (await mcssRelayProxy.connect(deployer).setBridgeAddress(taskArgs.chains, taskArgs.token)).wait();

    console.log(`MAPCrossChainServiceRelay register chain ${taskArgs.chain} mos address ${taskArgs.address} success`);


}