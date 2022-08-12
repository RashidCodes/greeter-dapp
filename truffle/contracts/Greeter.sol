// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract Greeter is Ownable {
  string private _greeting = "Hello, World from Solidity!";

  function greet() external view returns(string memory) {
    return _greeting;
  }

  function setGreeting(string calldata greeting) external {
    _greeting = greeting;
  }
}
