var Election = artifacts.require('../contracts/Election.sol');

contract('Election',function(accounts){
    var electionInstance;
    it('initialize with 2 candidates!',function(){
        return Election.deployed().then(function(inst){
            return inst.candidatesCount();
        }).then(function(count){
            assert.equal(count,2);
        });
    });

    it('initialize candidates with correct value',function(){
        return Election.deployed().then(function(inst){
            electionInstance = inst;
            return electionInstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate[0],1,'contains correct id');
            assert.equal(candidate[1],'Bapak Suherman', 'contains correct name');
            assert.equal(candidate[2],0,'contains valid init vote count');
            return electionInstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate[0],2,'contains correct id');
            assert.equal(candidate[1],'Bapak Sutejo','contains correct name');
            assert.equal(candidate[2],0,'contains valid init vote count');
        })
    })
});