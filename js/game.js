const canvas = document.getElementById('canvas');
canvas.width = 1085;
canvas.height = 610;
const ctx = canvas.getContext('2d');

// global variable 
const gapChair = 3;
const width = 68;
const height = 68;
const chairs = [];
const active = [];
let floatingMessage = [];
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: 10,
    y: 10,
}

canvas.addEventListener('mousemove',(e) => {
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
})

canvas.addEventListener('mouseleave',() => {
    mouse.x = undefined,
    mouse.y = undefined
})

const activeChairs = [
    {x:136,y:0},
    {x:272,y:0},
    {x:408,y:0},
    {x:544,y:0},
    {x:680,y:0},
    {x:816,y:0},
    {x:952,y:0},
    {x:136,y:544},
    {x:272,y:544},
    {x:408,y:544},
    {x:544,y:544},
    {x:680,y:544},
    {x:816,y:544},
    {x:0,y:68},
    {x:0,y:204},
    {x:0,y:340},
    {x:0,y:476},
    {x:1020,y:68},
    {x:1020,y:204},
    {x:1020,y:340},
    {x:1020,y:476},
    {x:136,y:68},
    {x:136,y:204},
    {x:136,y:340},
    {x:136,y:476},
    {x:884,y:68},
    {x:884,y:204},
    {x:884,y:340},
    {x:884,y:476},
    {x:408,y:136},
    {x:408,y:272},
    {x:408,y:340},
    {x:544,y:408},
    {x:272,y:408}
]

class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){
        ctx.strokeStyle = 'gray';
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.stroke();
    }
}

function drawGrid(){
    for(let y = 0; y < canvas.height; y+= height){
        for(let x = 0; x < canvas.width; x+= width){
            chairs.push(new Cell(x,y));
        }
    }
}
drawGrid()
function drawCell(){
    for(let i = 0; i < chairs.length; i++){
        chairs[i].draw();
    }
}

class Chairs{
    constructor(x,y){
        this.x = x + 3;
        this.y = y + 3;
        this.width = width - gapChair * 2;
        this.height = height - gapChair * 2;
    }
    draw(){
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

function handleChairs(){
    for(let i = 0; i < activeChairs.length; i++){
        active.push(new Chairs(activeChairs[i].x,activeChairs[i].y));
    }
}
function drawChairs(){
    for(let i = 0; i < active.length; i++){
        active[i].draw();
    }
}

class FloatingMessage{
    constructor(x,y){
        this.x = x + 40;
        this.y = y - 50;
        this.text = "Arial 20px";
        this.lifeSpan = 0;
    }
    update(){
        this.lifeSpan += 10;
    }
    draw(){
       if(this.lifeSpan < 100){
        ctx.font = this.text;
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x,this.y,100,50);
        ctx.fillStyle = 'red';
        ctx.fillText('Nama: Bla Bla Bla',this.x + 10,this.y + 30);
       }
    }
}

function handleFloatingMessage(){
    for(let i = 0; i < floatingMessage.length; i++){
       if(floatingMessage.length <= 1){
        floatingMessage[i].update();
        floatingMessage[i].draw();
        console.log(floatingMessage[i].lifeSpan)
        if(floatingMessage[i].lifeSpan === 100){
            floatingMessage.splice(i,1);
            floatingMessage.limitAdd = 1;
            i--;
        }
       }else{
        floatingMessage = [];
       }
    }
}

canvas.addEventListener('click',function(){
   for(let i = 0; i < active.length; i++){
        if(collision(active[i],mouse)){
            return floatingMessage.push(new FloatingMessage(mouse.x,mouse.y));
        }
   }
})


const Init = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(Init);
    handleChairs()
    drawCell()
    drawChairs()
    handleFloatingMessage();
}
Init()

function collision(first,second){
    if(!(first.x > second.x + width || first.x + width < second.x ||
    first.y > second.y + width || first.y + width < second.y)){
        return true;
    }
}

