
const apiURL = 'http://localhost:3000/produtos';

document.querySelector('.botao-claro').addEventListener('click', (e) => {
  e.preventDefault(); // Evita o recarregamento da página
  document.getElementById('formulario-produtos').reset(); // Limpa os campos do formulário
});

document.getElementById('formulario-produtos').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita o recarregamento da página

  const nome = document.getElementById('nome').value;
  const valor = parseFloat(document.getElementById('valor').value);
  const img = document.getElementById('img').value;

  const novoProduto = { nome, valor, img };

  try {
    const resposta = await fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoProduto),
    });

    if (!resposta.ok) throw new Error('Erro ao adicionar produto');

    alert('Produto adicionado com sucesso!');
    carregarProdutos(); // Atualiza a lista
  } catch (erro) {
    console.error('Erro ao adicionar produto:', erro);
    alert('Não foi possível adicionar o produto.');
  }
});



async function carregarProdutos() {
  try {
    
    const resposta = await fetch(apiURL);
    const produtos = await resposta.json();

    const produtosContainer = document.getElementById('card');

    produtosContainer.innerHTML = '';


    produtos.forEach(produto => {

      const produtoElemento = document.createElement('div');
      produtoElemento.classList.add('inner-card');
      produtoElemento.setAttribute('data-id', produto.id);


      produtoElemento.innerHTML = `
        <img src="${produto.img}" alt="${produto.nome}">
        <div class="card-info">
            <p>${produto.nome}</p>
            <div class="card-info-preco">
                <h2>$ ${produto.valor.toFixed(2)} </h2>
            
                <img  class="card-img" src="images/lixeira.png" alt="incone de lixeira">
                
            </div>
        </div>
      `;

      produtosContainer.appendChild(produtoElemento);
    });

    document.querySelectorAll('.card-img').forEach(lixeira => {
      lixeira.addEventListener('click', async (e) => {
        const produtoElemento = e.target.closest('.inner-card');
        const id = produtoElemento.dataset.id;

        // Faz a requisição DELETE para excluir o produto
        try {
          const resposta = await fetch(`${apiURL}/${id}`, { method: 'DELETE' });

          if (resposta.ok) {
            // Remove o produto da interface
            produtoElemento.remove();
            alert('Produto excluído com sucesso!');
          } else {
            alert('Erro ao excluir o produto.');
          }
        } catch (erro) {
          console.error('Erro ao excluir produto:', erro);
          alert('Erro ao tentar excluir o produto.');
        }
      });
    });

  } catch (erro) {
    console.error('Erro ao carregar produtos:', erro);
    alert('Não foi possível carregar os produtos.');
  }
}


carregarProdutos();




