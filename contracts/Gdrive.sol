// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Gdrive {
    
    struct Access{
        address user;
        bool allow;
    }

    mapping(address => string[]) value;
    mapping(address => mapping(address=>bool)) public ownership;
    mapping(address => Access[]) accessList;

    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, string memory url)external {
       value[_user].push(url);
    }

    function allow(address _user) external {
        ownership[msg.sender][_user]=true;

        if(!previousData[msg.sender][_user]){
         accessList[msg.sender].push(Access(_user,true));        
         previousData[msg.sender][_user]=true;
        }
        else 
        {
        for (uint i=0; i<accessList[msg.sender].length; i++){
          if(accessList[msg.sender][i].user == _user){
            accessList[msg.sender][i].allow = true;
            break;
          }
        }
        }
    }

    function disallow(address _user) external {
        ownership[msg.sender][_user]=false;

        for (uint i=0; i<accessList[msg.sender].length; i++){
          if(accessList[msg.sender][i].user == _user){
            accessList[msg.sender][i].allow = false;
            break;
          }
        }
    }

    function display(address _user) external view returns(string[] memory){
        require(ownership[msg.sender][_user] || _user==msg.sender,"you don't have access");
         return value[_user];
    }

    function sharedAccess() external view returns(Access[] memory){
       return accessList[msg.sender];
    }
}
