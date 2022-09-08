// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Die = document.getElementById("player1Die")
const player2Die = document.getElementById("player2Die")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const player1Frame= document.getElementById("player1")
const player2Frame= document.getElementById("player2")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

let rollAnimationID
let stopRollID
let waitForFlipID
let hideOverlayID


document.getElementById("flipBtn").addEventListener("click", function() {
    //flip the coin via CSS
    document.getElementById("coin").classList.add("flipping")
    //Shows the player after 2 seconds
    waitForFlipID = setInterval(waitForFlip, 2000)
})


function waitForFlip() {
    clearInterval(waitForFlipID) //Stop interval
    //Random the firts player
    let firstPlayer

    if(Math.floor(Math.random()*2) === 0) {
        firstPlayer = "P1"
        player1Turn = true
    } else {
        firstPlayer = "P2"
        player1Turn = false
    }
    document.getElementById("coin-span").innerHTML = firstPlayer
    hideOverlayID = setInterval(hideOverlay, 1000)
}


function hideOverlay() {
    clearInterval(hideOverlayID)
    document.getElementById("coin").classList.remove("flipping")
    document.getElementById("overlay").style.display = "none";
    reset()
}


function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}


rollBtn.addEventListener("click", function() {    
    rollBtn.disabled = true
    rollAnimationID = setInterval(rollAnimation, 100)
    stopRollID = setInterval(stopRoll, 1200)
})
 

function rollAnimation() {
    
    var randomNumber = Math.floor(Math.random() * 6) + 1
    var randomDeg = Math.floor(Math.random() * 21) - 10
    
    if (player1Turn) {  
        player1Die.style.webkitTransform = 
            'rotate(' + randomDeg + 'deg)' + 
            'translate('+ randomNumber*2 + 'px,' + -randomNumber*2 + 'px)'
        player1Die.style.backgroundPositionX = -randomNumber *100 + 'px'
    } else {
        player2Die.style.webkitTransform = 
            'rotate(' + randomDeg + 'deg)' + 
            'translate('+ randomNumber*2 + 'px,' + -randomNumber*2 + 'px)'
        player2Die.style.backgroundPositionX = -randomNumber *100 + 'px'
    }
} 


function stopRoll() {
    clearInterval(rollAnimationID);
    clearInterval(stopRollID);
    
    const randomNumber = Math.floor(Math.random() * 6) + 1
    
    if (player1Turn) {             
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Die.style.backgroundPositionX = -randomNumber *100 + 'px'
        player1Die.classList.add("shaking")
        player2Die.classList.remove("shaking")
    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Die.style.backgroundPositionX = -randomNumber *100 + 'px'
        player2Die.classList.add("shaking")
        player1Die.classList.remove("shaking")
    }
    
    if (player1Score > 20) {
        message.textContent = "Player 1 Won"
        showResetButton()
    }  else if (player2Score > 20) {
        message.textContent = "Player 2 Won"
        showResetButton()
    } else {  
        if (player1Turn) { 
            player1Frame.classList.remove("active")
            player2Frame.classList.add("active")
            message.textContent = "Player 2 Turn"
        } else {
            player2Frame.classList.remove("active")
            player1Frame.classList.add("active") 
            message.textContent = "Player 1 Turn"
        }
        
        player1Turn = !player1Turn
    }
    
    rollBtn.disabled = false
}     
       

document.getElementById("resetBtn").addEventListener("click", function() {
    reset()
    document.getElementById("overlay").style.display = "block";
})   
        

function reset() {
    document.getElementById("coin-span").innerHTML = ""
    
    player1Score = 0
    player2Score = 0

    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0

    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    
    player1Die.style.backgroundPositionX = '0px'
    player2Die.style.backgroundPositionX = '0px'
    
    player1Die.style.webkitTransform = 'rotate(0deg) translate(0px, 0px)'
    player2Die.style.webkitTransform = 'rotate(0deg) translate(0px, 0px)'   
     
    if(player1Turn) {
        message.textContent = "Player 1 Turn"  
        player2Frame.classList.remove("active")
        player1Frame.classList.add("active")
    } else {
        message.textContent = "Player 2 Turn"  
        player1Frame.classList.remove("active")
        player2Frame.classList.add("active")
    }
    
      

}
