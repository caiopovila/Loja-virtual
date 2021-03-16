login = () => {
    let url = '/entrar';

    let body = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
     };
 
    let requisicao = new XMLHttpRequest();

    requisicao.open('POST', url);

    requisicao.responseType = 'json';

    requisicao.setRequestHeader('Content-type','application/json; charset=utf-8');
     
    requisicao.send(JSON.stringify(body));

    requisicao.onload = () => {

        if (requisicao.status >= 400)
            alert('Usuario não encontrado!');
        else if (requisicao.status >= 500)
            console.log(requisicao.response);
        else if (requisicao.status == 200) {
            window.location.reload(true);
        }        
    }

}

