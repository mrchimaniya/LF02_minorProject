function init(){
        gsap.registerPlugin(ScrollTrigger);

        // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
        
        const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
        });
        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        locoScroll.on("scroll", ScrollTrigger.update);
        
        // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
        ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
        });
        
        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        
        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();    
}

init();

var tl=gsap.timeline();
tl.from("#page1",{
    opacity:0,
    y:100,
    duration:0.5,
    delay:0.5,
})

.from("#nav *",{
    y:-100,
    duration:0.2,
    stagger:0.2,
    opacity:0,
})


.from("#page1Content *",{
    y:100,
    duration:0.2,
    stagger:0.2,
    opacity:0,
})

// var tl2=gsap.timeline(); or gsap.from sometimes we need to remove timeline for scrollTrigger where we directly use gsap.from function
gsap.from("#page2>h2",{
    x:-100,
    delay:0.5,
    duration:2,
    opacity:0,
    scrollTrigger:{
        trigger:"#page2>h2",
        scroller:"#main",
        // markers:true,
        start:"top 80%",
        end:"top 60%",
        scrub:2,
        toggleActions: 'restart pause resume pause'

        // In the example 'restart pause resume pause', each word represents a specific action:
        //     restart: Restart the animation when the trigger meets the start condition.
        //     pause: Pause the animation when the trigger meets the end condition.
        //     resume: Resume the animation when the trigger meets the start condition again.
        //     pause: Pause the animation when the trigger meets the end condition again.
    }
})

gsap.from("#page2Img",{
    x:100,
    delay:1,
    duration:1,
    opacity:0,
    stagger:0.2,
    scrollTrigger:{
        trigger:"#page2Img",
        scroller:"#main",
        // markers:true,
        start:"top 80%",
        end:"top 30%",
        scrub:2, //for smooting
        toggleActions: 'restart pause resume pause'
    }  
})

gsap.from("#page2 h1 i",{
    duration:1.5,
    opacity:0,
    repeat:-1,
})

gsap.from("#page3 h1,#page3 #page3Elem .elem",{
    opacity:0,
    y:100,
    duration:1,
    stagger:0.4,
    scrollTrigger:{
        trigger:"#page3 h1,#page3 #page3Elem .elem",
        scroller:"#main",
        // markers:true,
        start:"top 80%",
        end:"top 60%",
        scrub:2, //for smooting
        toggleActions: 'restart pause resume pause'
    }  
})

//we are using .to direction because we want to change it when we go down
gsap.to("#nav",{
    backgroundColor:"black",    
    scrollTrigger:{
        trigger:"#nav",
        scroller:"#main",
        // markers:true,
        // values in minus so because we want when we go down
        start: "top -50%",
        end: "top -40%",
        scrub: 1,
        toggleActions: 'restart pause resume pause',
    }
})



/* code by seriyans coding school sarthak bhaiya
var t1=gsap.timeline();
t1.from("#nav h1,#nav h3,#nav h4",{
    delay: 0.3,
    y: -30,
    duration: 0.5,
    opacity: 0,
    stagger:0.25
})

.from("#page1Content h1, #page1Content h3, #page1Content button",{
    y: 100,
    opacity:0,
    duration: 0.5,
    stagger:0.4
})


//for page2 we are not creating timeline.
gsap.from("#page2 h2",{
    x: -100,
    duration: 1,
    opacity: 0,
    scrollTrigger: {
        trigger: "#page2 h2",
        scroller:"main",
        markers:true,
        start:"top 70%",
        // end:"end 50%"
    }
})


//even here also we are not creating timeline or only .from() with above function
gsap.from("#page2Img",{
    x: -100,
    duration: 1,
    opacity: 0,
    scrollTrigger: {
        trigger: "#page2Img",
        scroller:"main",
        markers:true,
        start:"top 70%",
        // end:"end 50%"
    }
})


*/


/*
steps TO USE locomotive WITH scrolltrigger-:
    1. google locomotive cdn links and add in html page "css cdn" & "js cdn" 
        a. locomotive css link
        b. locomotive js script tag
        c. gsap js script tag
        d. scrolltrigger js script tag
    1. google locomotive scrolltrigger codepen
    2. copy all js part from the website
    3. remove RED, ORANGE, PURPLE panel code t1.from also after the panel code
    4. now select all .smooth-scroll and change with #main
    5. now replace all scroller:"body" with wrapper dive scroller:"main" don't provide any height and width to main(you can give width if you want)

    6. if you want to fixed or stick the nav bar so the only way is that, you have to give it outside from the main wrapper scroller so 
       that is why we kept it outside the main wrapper altough property is same like scroller will be #main not body because we are scrolling main wrapper not body
*/