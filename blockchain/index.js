var crypto = require('crypto');
BLOCKCHAIN = {}
PREVBLOCK = null

class Block {
  constructor({ index, timestamp, data, prevHash }) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.hashBlock();
    return this;
  }

  hashBlock() {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify({
        index: this.index,
        timestamp: this.timestamp,
        data: this.data,
        prevHash: this.prevHash
      }))
      .digest('hex');
  }
}

function createGenesisBlock() {
    const createdBlock = new Block({ index: 0, timestamp: Date.now(), data: null, prevHash: '0' });
    PREVBLOCK = createdBlock;
    return createdBlock;
}

function nextBlock(data) {
    const createdBlock = new Block({
        index: PREVBLOCK.index + 1,
        timestamp: Date.now(),
        data,
        prevHash: PREVBLOCK.hash
    });
    PREVBLOCK = createdBlock;
    return createdBlock;
}

// API
BLOCKCHAIN.CHAIN = [createGenesisBlock()];
BLOCKCHAIN.ADD_BLOCK = function(data) {
    BLOCKCHAIN.CHAIN.push(nextBlock(data));
}