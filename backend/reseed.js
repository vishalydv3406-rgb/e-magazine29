const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Magazine = require('./src/models/Magazine');
const Article = require('./src/models/Article');
const connectDB = require('./src/config/db');

dotenv.config({ path: __dirname + '/.env' });

connectDB().then(async () => {
  try {
    console.log("Wiping all databases for the massive encyclopedic reseed...");
    await Magazine.deleteMany();
    await Article.deleteMany();
    
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: 'password123', role: 'admin' });
    }

    const categories = ['Technology', 'Business', 'Health & Fitness', 'Travel', 'Education', 'History', 'Personality Disorders', 'Love', 'Relationships', 'Emotions', 'AI'];
    const articleTitles = [
      "A Comprehensive Overview", 
      "Historical Evolution", 
      "Modern Methodologies", 
      "Global Impact & Case Studies", 
      "Future Trajectories & Ethics"
    ];

    for (const cat of categories) {
      for (let m = 1; m <= 5; m++) {
        const mag = await Magazine.create({
          title: `${cat} - Volume ${m}`,
          description: `The encyclopedia of ${cat}. Discover deep insights, wikis, trends, and comprehensive breakthroughs in Issue ${m}.`,
          category: cat,
          coverImage: `https://picsum.photos/seed/${cat.replace(/[^a-zA-Z]/g, '')}CoverExt${m}/500/700`
        });
        
        for(let i=0; i<5; i++) {
          const titleArchetype = articleTitles[i];
          await Article.create({
            title: `${titleArchetype} in ${cat}`,
            content: `
              <div class="wiki-toc bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-3xl mb-12 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">📕 Contents</h3>
                <ul class="space-y-3 text-blue-600 dark:text-blue-400 font-medium text-lg list-decimal list-inside">
                  <li><a href="#intro" class="hover:underline transition-all hover:pl-2">Introduction to ${cat}</a></li>
                  <li><a href="#history" class="hover:underline transition-all hover:pl-2">Evolution & History</a></li>
                  <li><a href="#core" class="hover:underline transition-all hover:pl-2">Core Principles & Architecture</a></li>
                  <li><a href="#cases" class="hover:underline transition-all hover:pl-2">Deep Case Studies</a></li>
                  <li><a href="#global" class="hover:underline transition-all hover:pl-2">Global Interpretations</a></li>
                  <li><a href="#impact" class="hover:underline transition-all hover:pl-2">Societal Impact</a></li>
                  <li><a href="#gallery" class="hover:underline transition-all hover:pl-2">Visual Gallery</a></li>
                </ul>
              </div>
              
              <h2 id="intro" class="text-4xl font-extrabold mt-12 mb-8 tracking-tight">1. Introduction to ${cat}</h2>
              <img src="https://picsum.photos/seed/${cat.replace(/[^a-zA-Z]/g, '')}WikiIntro${m}${i}/1000/500" alt="Introduction to ${cat}" class="w-full h-[400px] object-cover rounded-3xl mb-10 shadow-lg border border-zinc-100 dark:border-zinc-800" />
              <p class="mb-6 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300"><strong>${cat}</strong> represents one of the most foundational pillars of modern human development. By analyzing the structural dynamics and systemic anomalies of ${cat}, researchers and enthusiasts can gain unprecedented insights into how complex variables interact on a macro scale. This definitive wiki entry serves to demystify the core tenets of the subject for academics and enthusiasts alike.</p>
              <p class="mb-10 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">Early theorists posited that without a robust understanding of this domain, cultural and technological stagnation was mathematically inevitable. Today, these early hypotheses hold more weight than ever as rapid globalization forces extreme intersectional dependencies across all major industrial sectors.</p>
              
              <hr class="border-zinc-200 dark:border-zinc-800 my-10" />

              <h2 id="history" class="text-4xl font-extrabold mt-12 mb-8 tracking-tight">2. Evolution & History</h2>
              <p class="mb-8 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">The historical progression is marked by several distinct paradigms. In the nascent stages, classical approaches completely dominated the landscape, focusing heavily on rigid, deterministic frameworks that left little room for organic variation. However, as the era progressed steadily into the late 20th century, a massive paradigm shift ruptured the establishment.</p>
              
              <blockquote class="border-l-4 border-indigo-500 pl-8 italic my-12 text-2xl font-serif text-zinc-600 dark:text-zinc-400 bg-indigo-50 dark:bg-indigo-900/10 py-6 pr-6 rounded-r-3xl">
                "The history of ${cat} is not a straight theoretical line, but a tremendously complex web populated by iterative failures, resilient adaptations, and ultimately, monumental breakthroughs." <br/>
                <span class="text-lg font-sans font-bold text-indigo-500 mt-4 block">— Leading Scholar, Journal of Modern Studies</span>
              </blockquote>
              
              <p class="mb-10 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">This radical shift paved the way for modern interpretations that actively embrace fluidity, asynchronous processing, and continuous integration. We can effectively trace the etymological and practical roots back through thousands of synthesized documents spanning decades of rigorous, peer-reviewed academic study.</p>

              <hr class="border-zinc-200 dark:border-zinc-800 my-10" />

              <h2 id="core" class="text-4xl font-extrabold mt-12 mb-8 tracking-tight">3. Core Principles & Architecture</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                 <div class="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                    <div class="text-4xl mb-4">🏛️</div>
                    <h4 class="font-bold text-2xl mb-4">Theoretical Foundation</h4>
                    <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">Establishing the base laws, logic constraints, and ethical axioms that purely govern the field, providing a rigorously unshakeable mathematical and philosophical backing.</p>
                 </div>
                 <div class="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                    <div class="text-4xl mb-4">⚙️</div>
                    <h4 class="font-bold text-2xl mb-4">Practical Application</h4>
                    <p class="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">Transforming intensely abstract concepts into tangible engineering, commercial enterprise, and societal solutions that drive provable empirical results worldwide.</p>
                 </div>
              </div>
              <p class="mb-10 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">These core principles actively dictate the methodology used by senior practitioners. By adhering strictly to the theoretical foundation while remaining violently agile in practical application, incredible operational efficiency is achieved across the board.</p>

              <hr class="border-zinc-200 dark:border-zinc-800 my-10" />

              <h2 id="cases" class="text-4xl font-extrabold mt-12 mb-8 tracking-tight">4. Deep Case Studies & Applied Research</h2>
              <p class="mb-8 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">The theoretical aspects of <strong>${cat}</strong> are immensely validated when deployed into real-world laboratory environments. For instance, in a randomized double-blind trial conducted at the Geneva Institute for Systemic Growth, researchers deliberately altered variables to observe cascading structural feedback.</p>
              
              <div class="bg-blue-50 dark:bg-zinc-900 border-l-8 border-blue-500 p-8 rounded-2xl mb-10 shadow-inner">
                <h4 class="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">Research Highlight: Paradigm Shift Delta</h4>
                <p class="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">Observers noted a 400% increase in baseline efficiency metric stability when applying foundational integration patterns. This profoundly indicates that early-stage adoption drastically outpaces reactive adaptation strategies across multi-tiered architectures.</p>
              </div>

              <p class="mb-10 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">Furthermore, independent verification from peer-reviewed publications strictly corroborates these phenomenal bounds. The underlying mechanism directly dictates how localized sub-systems communicate within the broader socio-economic framework.</p>

              <hr class="border-zinc-200 dark:border-zinc-800 my-10" />

              <h2 id="global" class="text-4xl font-extrabold mt-12 mb-8 tracking-tight">5. Global Interpretations & Cultural Synthesis</h2>
              <p class="mb-8 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">It is deeply vital to recognize that the interpretation of <strong>${cat}</strong> absolutely shatters singular monolithic understanding when scaled across international borders. Global cultures absorb, translate, and completely re-synthesize these mechanisms based heavily on their own localized historical frameworks.</p>
              <ul class="list-disc pl-8 mb-10 space-y-4 text-lg text-zinc-700 dark:text-zinc-300">
                <li><strong>Eastern Dialectics:</strong> Frequent integration with holistic, communal structures emphasizing collective infrastructural benefit.</li>
                <li><strong>Western Empiricism:</strong> Heavy reliance on rigorous singular tracking, quantitative extraction, and aggressive rapid prototyping metrics.</li>
                <li><strong>Southern Hemispheric Anomalies:</strong> A beautiful blend of deeply rooted traditional systemic thinking paired with modern aggressive adaptation loops.</li>
              </ul>

              <hr class="border-zinc-200 dark:border-zinc-800 my-10" />

              <h2 id="impact" class="text-4xl font-extrabold mt-12 mb-8 tracking-tight">6. Comprehensive Societal Impact</h2>
              <p class="mb-10 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">It is virtually impossible to overstate the profound socio-economic and cultural ramifications. From dramatically transforming fragile global supply chains to completely altering the fundamental psychology of how humans natively communicate, learn, and love, <strong>${cat}</strong> stands proudly at the absolute epicenter of the 21st-century paradigm revolution.</p>
              
              <hr class="border-zinc-200 dark:border-zinc-800 my-10" />

              <h2 id="gallery" class="text-4xl font-extrabold mt-12 mb-8 tracking-tight">7. Dense Visual Gallery</h2>
              <p class="mb-8 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">Review the generated catalog of visual models, graphical metaphors, and illustrations that organically encapsulate the living essence of this complex topic.</p>
              <div class="flex flex-col gap-10 my-12 bg-white dark:bg-zinc-950 p-6 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <figure class="flex flex-col items-center group">
                  <div class="overflow-hidden rounded-2xl w-full max-w-4xl shadow-xl">
                    <img src="https://picsum.photos/seed/CartoonGenWiki${cat.replace(/[^a-zA-Z]/g, '')}${m}${i}A/800/500" alt="Analytical abstraction" class="w-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-all duration-500" />
                  </div>
                  <figcaption class="text-base mt-6 text-zinc-500 font-medium italic">Fig 1. High-level schematic abstraction of the localized systematic workflows and structural topologies.</figcaption>
                </figure>
                
                <figure class="flex flex-col items-center group mt-8">
                  <div class="overflow-hidden rounded-2xl w-full max-w-4xl shadow-xl">
                    <img src="https://picsum.photos/seed/CartoonGenWiki${cat.replace(/[^a-zA-Z]/g, '')}${m}${i}B/800/500" alt="Secondary Illustration" class="w-full object-cover group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500" />
                  </div>
                  <figcaption class="text-base mt-6 text-zinc-500 font-medium italic">Fig 2. A beautiful, chaotic visualization representing the rapid pace of iteration and discovery.</figcaption>
                </figure>
              </div>
            `,
            magazineId: mag._id,
            authorId: admin._id,
            readingTime: Math.floor(Math.random()*15)+10,
            status: 'published'
          });
        }
      }
    }
    console.log('Successfully launched MASSIVE ENCYCLOPEDIC database generation! >175 thick articles saved.');
  } catch (err) {
    console.error("Error during encyclopedic seed:", err);
  } finally {
    process.exit();
  }
});
