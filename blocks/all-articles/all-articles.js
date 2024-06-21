async function fetchArticles() {
    try {
        const apiEndpoint = 'https://main--edscapstone--harika562000.hlx.live/magazine/magazine-index.json';
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data.data;
    } catch (error) {
        return [];
    }
}

function getAbsolutePath(relativePath) {
    const baseUrl = 'https://main--edscapstone--harika562000.hlx.live';
    return new URL(relativePath, baseUrl).href;
}

export default async function decorate(block) {
    const articles = await fetchArticles();

    const ul = document.createElement('ul');

        articles.forEach(article => {
            const li = document.createElement('li');
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('all-articles-card-image');
            const pictureLink = document.createElement('a');
            pictureLink.href = getAbsolutePath(article.path);
            const picture = document.createElement('picture');
            const source = document.createElement('source');
            source.type = 'image/webp';
            source.srcset = getAbsolutePath(article.image);
            const img = document.createElement('img');
            img.loading = 'lazy';
            img.alt = article.title;
            img.src = getAbsolutePath(article.image);
            picture.appendChild(source);
            picture.appendChild(img);
            pictureLink.appendChild(picture);
            imageDiv.appendChild(pictureLink);

            const bodyDiv = document.createElement('div');
            bodyDiv.classList.add('all-articles-card-body');
            const titleLink = document.createElement('a');
            titleLink.href = getAbsolutePath(article.path);
            const title = document.createElement('p');
            title.innerHTML = `<strong>${article.title}</strong>`;
            titleLink.appendChild(title);
            const description = document.createElement('p');
            description.textContent = article.description;
            bodyDiv.appendChild(titleLink);
            bodyDiv.appendChild(description);

            li.appendChild(imageDiv);
            li.appendChild(bodyDiv);

            ul.appendChild(li);
        });

        block.textContent = '';
        block.appendChild(ul);
}
