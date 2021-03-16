let tams = document.getElementById('tams');

dispT = (cor, produto) => {

    let url = '/produto/disp/' + cor + '/' + produto;

    let requisicao = new XMLHttpRequest();

    requisicao.open('GET', url);

    requisicao.responseType = 'json';

    requisicao.send();

    requisicao.onload = () => {
        tams.innerHTML = "";
        for (let item of requisicao.response) {
            criaviewT(item);
        }
    }
}

const criaviewT = (tam) => {
    let opt = document.createElement('option');
    tams.appendChild(opt);
    opt.setAttribute('value', tam.tamanho);
    opt.innerText = tam.tamanho;
}

$('#cors').change(function () {
    var val = $("#cors option:selected").text();
    dispT(val, window.location.pathname.split('/')[2])
});

const alterna = (src) => {
    $('#full').html(`
        <img src='${src}' class="img-fluid" alt="" />    
        `);
}
