// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract FlowPassthrough {

  event Tranfered(address from, address to, uint256 amount);

  function transferFlow(address payable _to) public payable {
      (bool sent, bytes memory data) = _to.call{value: msg.value}("");
      require(sent, "Failed to send Flow");
      emit Tranfered(msg.sender, _to, msg.value);
  }
}