const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const dist = 150;
const avg_vel = 1.75;

let mouse = {
    x:canvas.width/2,
    y:canvas.height/2
}

particles =  []


window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



//Particles
class Particle{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.vel_x = 0;
        this.vel_y = 0;
        this.color;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    setRandomColor(){
        let r = Math.round(Math.random()*256)
        let g = Math.round(Math.random()*256)
        let b = Math.round(Math.random()*256)
        let a = Math.round(Math.random())*0.7
        this.color = "rgba("+r+","+g+","+b+","+a+")"
    }
    update(){
        this.x = this.x + this.vel_x
        this.y = this.y + this.vel_y
    }
    reduceRadius(){
        this.r = this.r - 0.25
    }
}



window.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX
    mouse.y = e.clientY
    let particle = new Particle(mouse.x,mouse.y,Math.random()*25)
    particle.vel_x = (Math.random()-0.5)*avg_vel
    particle.vel_y = (Math.random()-0.5)*avg_vel
    particle.setRandomColor()
    particles.push(particle)
})

setInterval(function(){
    let particle = new Particle(mouse.x,mouse.y,Math.random()*10+5)
    particle.vel_x = (Math.random()-0.5)*avg_vel
    particle.vel_y = (Math.random()-0.5)*avg_vel
    particle.setRandomColor()
    particles.push(particle)
},50)

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    if(!particles.length == 0){
        for(i=0;i<particles.length;i++){
            particles[i].update()
            particles[i].draw()
            let dist_from_mouse = Math.sqrt(Math.pow((particles[i].x - mouse.x),2)+Math.pow((particles[i].y - mouse.y),2))
            if(dist_from_mouse>dist){
                particles[i].reduceRadius()
                
            }
            if(particles[i].r <= 1){
                particles.splice(i,1)
                particles.sort()
            }

        }
    }
    
}
animate();