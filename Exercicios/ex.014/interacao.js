function carregar()
{
    var msg = window.document.getElementById ('msg')
    var img = window.document.getElementById('imagem')
    var data = new Date()
    var hora = data.getHours
    msg.innerHTML=`agora sao ${hora} horas.`
if (hora >= 0 && hora < 12) {
    img.src = 'manha.png' 
    //bom dia
}
 else if (hora >=12 && hora < 18) {
    img.src = 'tarde.png'
    //boa tarde

} 
else {
    img.src = 'noite.png'
    //boa noite
}

}

