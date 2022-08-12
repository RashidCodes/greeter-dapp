const GreeterContract = artifacts.require("Greeter.sol");

module.exports = function (deployer) {
  deployer.deploy(GreeterContract);
}
