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
        console.log('Fetched data:', data); // Debugging: log the fetched data
        return data.data; // Adjust this line based on the actual JSON structure
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export default async function decorate(block) {
    const articles = await fetchArticles();

    const ul = document.createElement('ul');

    articles.forEach(article => {
        const li = document.createElement('li');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('all-articles-card-image');
        const picture = document.createElement('picture');
        const source = document.createElement('source');
        source.type = 'image/webp';
        source.srcset = article.path; // Replace with actual image URL in WebP format from the API
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = article.title; // Replace with actual alt text from the API
        img.src = article.image; // Replace with actual image URL in JPEG format from the API
        picture.appendChild(source);
        picture.appendChild(img);
        imageDiv.appendChild(picture);

        const bodyDiv = document.createElement('div');
        bodyDiv.classList.add('all-articles-card-body');
        const title = document.createElement('p');
        title.innerHTML = `<strong>${article.title}</strong>`; // Replace with actual title from the API
        const description = document.createElement('p');
        description.textContent = article.description; // Replace with actual description from the API
        bodyDiv.appendChild(title);
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
