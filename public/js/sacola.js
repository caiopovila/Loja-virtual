
let addSacola = (id, nome, preco, foto) => {
        var carrinho = JSON.parse(localStorage.getItem('lista-carrinho') || '[]');

        let i = 0;
        let quant = 1;
        for (let item of carrinho) {
            if (item.id == id && item.cor == document.getElementById('cors').value && item.tam == document.getElementById('tams').value) {
                carrinho.splice(i, 1);
                quant += item.quantidade;
            }
            i++;
        }
        carrinho.push({
            quantidade: quant,
            id: id,
            nome: nome,
            preco: preco,
            foto: foto,
            cor: document.getElementById('cors').value,
            tam: document.getElementById('tams').value
        });

        localStorage.setItem("lista-carrinho", JSON.stringify(carrinho));
        mudaIcon();
        console.log('Salvo com sucesso.');
};

let removeCarrinho = (id, cor, tam, preco) => {
        var carrinho = JSON.parse(localStorage.getItem('lista-carrinho') || '[]');

        let i = 0;
        for (let item of carrinho) {
            if (item.id == id && item.cor == cor && item.tam == tam) {
                if (item.quantidade > 1) {
                    item.quantidade -= 1; 
                    document.getElementById('quant'+item.id).innerText = item.quantidade;
                } else {
                    carrinho.splice(i, 1);
                    document.getElementById(`${id}${cor}${tam}`).innerHTML = '';
                }
                total += -preco;
            }
            i++;
        }

        document.getElementById('totalCompra').innerText = total;
        document.getElementById('total').innerText = total;
        localStorage.setItem("lista-carrinho", JSON.stringify(carrinho));

        if(!carrinho[0]) {
            sacola.innerHTML = `
                <div class="alert alert-info" role="alert">
                Nenhum produto!
                </div>            
                `;
                document.getElementById('btCompra').style.display = 'none';
        }
        mudaIcon();
        console.log('removido com sucesso.');
};

let mudaIcon = () => {
    var carrinho = JSON.parse(localStorage.getItem('lista-carrinho') || '[]');

    if(carrinho[0]) {
        $('#iSacola').html(`
            <img src="/img/isacolanotificacao.png" alt="icone da sacola de compras" />    
        `);
    } else {
        $('#iSacola').html(`
        <img src="/img/isacola.png" alt="icone da sacola de compras" />    
    `); 
    }
}

window.onload = () => {
    mudaIcon();
}



