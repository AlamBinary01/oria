import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHospital,
  faBuilding,
  faClipboardCheck,
  faPlane,
  faUsers,
  faSync,
  faCogs,
  faGlobe,
 
  faUserTie, 
} from '@fortawesome/free-solid-svg-icons';

function ServiceCard({ icon, title, details }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-3xl text-center text-indigo-600 mb-4">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h2 className="text-xl font-medium text-gray-800 text-center mb-3">
          {title}
        </h2>
        <p className="text-gray-600 text-center">
          {details}
        </p>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    { icon: faHospital, title: 'AI Trained on Your Data', details: 'Upload any data and build your knowledge base' },
    { icon: faBuilding, title: 'Boost Employee Efficiency', details: 'With instant answers, ideas, and ready-made work, your team can work smarter, not harder. Use Oria to complete tasks faster, like writing professional emails, translating documents, or creating marketing materials.' },
    { icon: faClipboardCheck, title: 'Access our Marketplace', details: 'Explore AI apps, Web3 tools, prompts, and skilled bots. Get access to hundreds of AI tools, web builders, and creativity-boosting prompts. Empower your work with the latest AI innovations. Discover valuable websites for LLC setup, international banking, market analysis, and more. ' },
    { icon: faPlane, title: 'Create Your Own Bot', details: 'Customize your bot to meet your specific needs' },
    { icon: faUsers, title: 'Prompt and Bot Library', details: 'Keep all your prompts and bots organized and accessible in one place.' },
    { icon: faSync, title: 'AI Customer Support', details: ' Oria learns from your documents, website content, and other sources to generate a chatbot that efficiently handles 40 to 70% of your customer support requests.' },
    { icon: faCogs, title: 'Multilingual Support', details: ' Oria can work with your documents in any language, allowing users to connect and collaborate globally' },
    { icon: faGlobe, title: 'Interact with Everything', details: 'Keep all your prompts and bots organized and accessible in one place.' },

    { icon: faUserTie, title: 'And Much More', details: 'Discover all the other features that Oria has to offer to help your startup succeed.' },

  ];

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4 text-center">Key Features</h1>
      <div className="flex flex-wrap -mx-4">
        {services.map((service, index) => (
          <ServiceCard key={index} icon={service.icon} title={service.title} details={service.details} />
        ))}
      </div>
    </div>
  );
}

export default Services;
