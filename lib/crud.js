const mongoose = require('mongoose');



class CRUD {
  constructor(name, Schema) {
    this.model = mongoose.model(name, Schema);
  }

  async find(query = {}, propertiesToGet){
    return new Promise((resolve, reject)=>{
      this.model.find(query, propertiesToGet, function(err, docs){
        if(err) return reject(err);
        resolve(docs)
      });
    })
  }
  async findOne(data = {}, propertiesToGet){
    return new Promise((resolve, reject)=>{
      this.model.findOne(data, function(err, docs){
        if(err) return reject(err);
        resolve(docs)
      });
    })
  }
  async findById(id, propertiesToGet){
    return new Promise((resolve, reject)=>{

      this.model.findOne(id, function(err, docs){
        if(err) return reject(err);
        resolve(docs)
      });
    })
  }
  async create(data){
    return new Promise((resolve, reject)=>{
      this.model.create(data, function(err, docs){
        if(err) return reject(err);
        resolve(docs)
      });
    })
  }
  async remove(data){
    return new Promise((resolve, reject)=>{
      this.model.remove(data, function(err, docs){
        if(err) return reject(err);
        resolve(docs)
      });
    })
  }
}
module.exports = CRUD;
