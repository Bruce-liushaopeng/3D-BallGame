export const handleKeypress = (ballState) => {
    return (e) => {
        if (e.keyCode == '38') {
            //up arrow
            if(Math.abs(ballState.ySpeed) <= 1) {
                ballState.ySpeed += 0.3
            }
        }
        else if (e.keyCode == '40') {
            // down arrow
            if(Math.abs(ballState.ySpeed) <= 1) {
                ballState.ySpeed -= 0.3
            } 
        }
        else if (e.keyCode == '37') {
           // left arrow
           if(Math.abs(ballState.ySpeed) <= 1) {
            ballState.xSpeed -= 0.3
           }
        }
        else if (e.keyCode == '39') {
           // right arrow
           if(Math.abs(ballState.ySpeed) <= 1) {
            ballState.xSpeed += 0.3
            }
        }
    }
}