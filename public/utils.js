const { rejects } = require('assert');
const fs=require('fs');
const { resolve } = require('path');
const readlines=require('readline');

/*
lastline s-> promise-> resolve,reject
reject doesn't happend
resolve->

lines=[]

create object r1
r1.on('line') lines.push(line)
r1.on('close') return lastlines
r1.on('err) -> reject(err)

*/
const lastLines =(filename)=>{
    return new Promise((resolve,reject) =>{
        r1=readlines.createInterface({
            input: fs.createReadStream(filename),
            output: process.stdout,
        });
        let lines=[];
        r1.on('line',(line) =>{
            lines.push(line);
        });
        r1.on('error',err =>{
            reject(error)
        });
        r1.on('close',() =>{
            lastline=lines.length>0?lines[lines.length-1]:"";
            resolve(lines.slice(-10));
            //resolve(lines.slice(-10));
        })
    });
}

const newLines=(filename) =>{
    return new Promise((resolve,reject) =>{
        r1=readlines.createInterface({
            input: fs.createReadStream(filename),
            output: process.stdout,
        });
        let register=false;
        let newlines=[];
        //let lastline='';

        r1.on('line',line =>{
            if(lastline=='' || register){
                newlines.push(line);
            }
            else if(lastline==line){
                register=true;
            }
        });

        r1.on('error',err =>{
            reject(err);
        });

        r1.on('close',() =>{
            if(newlines.length>0){
                lastline=newlines[newlines.length-1];
                resolve(newlines);
            }
            else{
                lastline="";
                resolve('');
            }
        });

    });
}

module.exports={
    lastLines,
    newLines
}