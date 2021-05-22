# controle-de-operacoes
conversor de moedas e sistema de cadastro de casa de câmbio

O projeto aqui apresentado foi desenvolvido para ser de fácil acesso e compreensão.
Por isso, foi desenvolvido nas linguagens JavaScript, HTML e CSS, de modo que seja possível ser utilizado no próprio navegador Google Chrome através do arquivo "index.html" e todos os campos de input e output possuem legenda de identificação.

O projeto tem seu início no cabeçalho simples que permite o refresh da página, caso se faça necessario.

Logo após, tem-se o campo de inserção de valor inicial, bem como área de escolha de unidade monetária. Que é feita com o auxílio de uma menu de seleção com moedas pré-determinadas e registradas.
Os cálculos referentes ao valor final da operação e à taxa de serviço, são feitos automaticamente, seguindo o preenchimento do campo "Valor".

A área de cadastro foi inserida depois do conversor para que o usuário possa avaliar os custos sem que haja prejuízo à sua privacidade.
Porém, para finalizar a transação, é necessário que o usuário se identifique através do campo "Cadastro" e então clique no botão "Realizar Operação".
Em seguida os dados referentes à transação serão armazenados momentaneamente e então inseridos na tabela "Últimas operações" que será gerada conforme houverem cadastros.
Onde ficarão exibidas as informações: Nome do cliente, moeda de origem, moeda de destino, data da operação, valor original, valor convertido e taxa cobrada.

Ainda referente à tabela, pode-se utilizar os filtro de "Cliente" e "Data" para escolher a parcela de usuário que se deseja visualizar. 
Essa filtragem erá realizada após a escolha dos parâmetros com o auxílio de menus de seleção, através do botão "Filtrar".

Por fim, tem-se exibido acima da tabela os somatórios do valor total das operações e valor total das taxas realizadas.
