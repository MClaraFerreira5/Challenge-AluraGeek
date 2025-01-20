
const apiURL = 'http://localhost:3000/produtos';



async function carregarProdutos() {
  try {
    // Faz a requisição GET para buscar os produtos
    const resposta = await fetch(apiURL);
    const produtos = await resposta.json();

    // Seleciona o container onde os produtos serão exibidos
    const produtosContainer = document.getElementById('produtos');

    produtosContainer.innerHTML = '';

    // Itera sobre os produtos e cria os elementos HTML
    produtos.forEach(produto => {
      // Cria um elemento para o produto
      const produtoElemento = document.createElement('div');
      produtoElemento.classList.add('card');

      // Adiciona o conteúdo do produto
      produtoElemento.innerHTML = `
        <img src="${produto.img}" alt="${produto.nome}">
        <div class="card-info">
            <p>${produto.nome}</p>
            <div class="card-info-preco">
                <h2>$ ${produto.valor.toFixed(2)} </h2>
                <img src="images/lixeira.png" alt="incone de lixeira">
            </div>
      `;

      // Adiciona o produto ao container
      produtosContainer.appendChild(produtoElemento);
    });
  } catch (erro) {
    console.error('Erro ao carregar produtos:', erro);
    alert('Não foi possível carregar os produtos.');
  }
}

// Chama a função ao carregar a página
carregarProdutos();




