document.addEventListener("DOMContentLoaded", function() {
    var searchInput = document.getElementById('searchInput');
    let searchButton = document.getElementById('searchButton');
    const searchResultsElement = document.getElementById('searchResults');
    const sortOptions = document.createElement('div');
    sortOptions.id = 'sortOptions';
    let currentSort = 'asc';
    let selectedSortBy = 'title';

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        const results = searchBooksByTitle(searchTerm);
        displaySearchResults(results);
    });

    function displaySearchResults(results) {
        let output = '';
        results.forEach(book => {
            output += `
                <div class="book-item">
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Year:</strong> ${book.year}</p>
                </div>
            `;

        });

        if (results[0].title !== "No books found with that title.") {
            sortOptions.innerHTML = `
                <label for="sort">Sort by:</label>
                <select id="sort">
                    <option value="title_asc" ${selectedSortBy === 'title' && currentSort === 'asc' ? 'selected' : ''}>Title &uarr;</option>
                    <option value="title_desc" ${selectedSortBy === 'title' && currentSort === 'desc' ? 'selected' : ''}>Title &darr;</option>
                    <option value="author_asc" ${selectedSortBy === 'author' && currentSort === 'asc' ? 'selected' : ''}>Author &uarr;</option>
                    <option value="author_desc" ${selectedSortBy === 'author' && currentSort === 'desc' ? 'selected' : ''}>Author &darr;</option>
                    <option value="year_asc" ${selectedSortBy === 'year' && currentSort === 'asc' ? 'selected' : ''}>Year &uarr;</option>
                    <option value="year_desc" ${selectedSortBy === 'year' && currentSort === 'desc' ? 'selected' : ''}>Year &darr;</option>
                </select>
            `;
            output = sortOptions.outerHTML + output;
        }

        searchResultsElement.innerHTML = output;

        const sortSelect = document.getElementById('sort');
        sortSelect.addEventListener('change', function() {
            const sortValue = sortSelect.value.split('_');
            selectedSortBy = sortValue[0];
            currentSort = sortValue[1];
            const sortedResults = sortResults(results, selectedSortBy, currentSort);
            displaySearchResults(sortedResults);
        });
    }

    function sortResults(results, sortBy, order) {
        return results.sort((a, b) => {
            if (sortBy === 'title') {
                return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            } else if (sortBy === 'author') {
                return order === 'asc' ? a.author.localeCompare(b.author) : b.author.localeCompare(a.author);
            } else if (sortBy === 'year') {
                return order === 'asc' ? a.year - b.year : b.year - a.year;
            }
        });
    }
});
