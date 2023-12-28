document.addEventListener('DOMContentLoaded', async function () {
  const itemsPerPage = 15;
  const maxVisiblePages = 1;
  var data = JSON.parse(localStorage.getItem("myData"));
  var fields = JSON.parse(localStorage.getItem("fields"));
  console.log(data);
  console.log(fields);

  const displayData = (data, page, fieldsToDisplay) => {
    const tableBody = document.getElementById('tableBody');
    const tableHead = document.getElementById('tableHead');

    tableBody.innerHTML = '';
    tableHead.innerHTML = '';

    const headRow = document.createElement('tr');
    fieldsToDisplay.forEach((field) => {
      const th = document.createElement('th');
      th.textContent = field;
      headRow.appendChild(th);
    });
    tableHead.appendChild(headRow);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const productsToDisplay = data.slice(startIndex, endIndex);

    productsToDisplay.forEach((product) => {
      const row = document.createElement('tr');

      fieldsToDisplay.forEach((field) => {
        const cell = document.createElement('td');
        cell.textContent = product[field];
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  };

  const generatePagination = (totalPages, currentPage) => {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - Math.floor(maxVisiblePages / 2) && i <= currentPage + Math.floor(maxVisiblePages / 2))) {
        const li = document.createElement('li');
        li.textContent = i;
        li.addEventListener('click', () => onPageClick(i));
        pagination.appendChild(li);
      } else if (pagination.lastChild && pagination.lastChild.textContent !== '...') {
        const li = document.createElement('li');
        li.textContent = '...';
        pagination.appendChild(li);
      }
    }
  };

  let currentPage = 1;

  const onPageClick = (page) => {
    currentPage = page;
    displayData(productsArray, page, fields);
    generatePagination(totalPages, page);
  };

  const rawData = data;
  const productsArray = Object.entries(rawData.products).map(([key, value]) => ({ id: key, ...value }));
  productsArray.sort((a, b) => b.popularity - a.popularity);

  const totalPages = Math.ceil(productsArray.length / itemsPerPage);
  generatePagination(totalPages, 1);

  displayData(productsArray, 1, fields);

  const prev = document.getElementById("prev");
  prev.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayData(productsArray, currentPage, fields);
      generatePagination(totalPages, currentPage);
    } else {
      alert("You are on the first page");
    }
  });

  const next = document.getElementById("next");
  next.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayData(productsArray, currentPage, fields);
      generatePagination(totalPages, currentPage);
    } else {
      alert("You are on the last page");
    }
  });
});
