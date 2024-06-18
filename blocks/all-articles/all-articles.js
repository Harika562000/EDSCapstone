// import { createOptimizedPicture } from './aem.js';
// import removeDefaultBtn from './helper.js';


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

            // Create image div with link
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('all-articles-card-image');
            const pictureLink = document.createElement('a');
            pictureLink.href = getAbsolutePath(article.path); // URL for the article
            const picture = document.createElement('picture');
            const source = document.createElement('source');
            source.type = 'image/webp';
            source.srcset = getAbsolutePath(article.image); // Convert to absolute path
            const img = document.createElement('img');
            img.loading = 'lazy';
            img.alt = article.title; // Replace with actual alt text from the API
            img.src = getAbsolutePath(article.image); // Convert to absolute path
            picture.appendChild(source);
            picture.appendChild(img);
            pictureLink.appendChild(picture);
            imageDiv.appendChild(pictureLink);

            // Create body div with link
            const bodyDiv = document.createElement('div');
            bodyDiv.classList.add('all-articles-card-body');
            const titleLink = document.createElement('a');
            titleLink.href = getAbsolutePath(article.path); // URL for the article
            const title = document.createElement('p');
            title.innerHTML = `<strong>${article.title}</strong>`; // Replace with actual title from the API
            titleLink.appendChild(title);
            const description = document.createElement('p');
            description.textContent = article.description; // Replace with actual description from the API
            bodyDiv.appendChild(titleLink);
            bodyDiv.appendChild(description);

            li.appendChild(imageDiv);
            li.appendChild(bodyDiv);

            ul.appendChild(li);
        });

        // ul.querySelectorAll('.all-articles-card-image img').forEach(img => {
        //     const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        //     img.closest('picture').replaceWith(optimizedPicture);
        // });

        block.textContent = '';
        block.appendChild(ul);

        // const wrapper = document.querySelector('.all-articles .all-articles-card-body');
        // removeDefaultBtn(wrapper);
}
