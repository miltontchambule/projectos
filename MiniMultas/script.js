

const matricula = "AKP827MC"

function multar(){

        let vel = document.getElementById('vel').value
        let mat = document.getElementById('mat').value.trim()
        let res = document.getElementById('res')

     

    
        if(vel === ""){
          res.innerHTML = "Introduza a velocidade"
          return

        }    
        
        if(mat === ""){
            res.innerHTML = "Introduza a matricula"
            return
        }

        let velocidade = Number(vel)
        // let matriculaDigitada = mat.value.toUpperCase() 
        
    
        if(velocidade > 80 && mat.toUpperCase() === "AKP827MC"){
             res.innerHTML = "Veiculo com matricula: " + matricula + " e prioritario e isento de multas."

        } else if(velocidade > 80){
            res.innerHTML = "Veiculo multado. Dirija-se ao INATTER."
        
        } else if(velocidade <= 80 && mat.toUpperCase() === "AKP827MC"){
            res.innerHTML = "Boa viagem, Presidente!"
       
        } 
        else{
            res.innerHTML = "Boa viagem!"
        }
    }



