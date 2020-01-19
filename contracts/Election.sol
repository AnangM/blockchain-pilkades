pragma solidity ^0.5.11;

contract Election{
    // model

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    // store candidate
    // fetch stored candidate
    mapping(uint => Candidate) public candidates;
    // store candidate  count
    uint public candidatesCount;

    //Constructor
    constructor () public {
        addCandidate("Bapak Suherman");
        addCandidate("Bapak Sutejo");
    }

    function addCandidate(string memory _name) private{
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

}