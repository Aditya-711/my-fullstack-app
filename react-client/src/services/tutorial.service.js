import http from "../http-common";

// class TutorialDataService {
//   getAll() {
//     return http.get("/tutorials");
//   }

//   get(id) {
//     return http.get(`/tutorials/${id}`);
//   }

//   create(data) {
//     return http.post("/tutorials", data);
//   }

//   update(id, data) {
//     return http.put(`/tutorials/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
// }
class TutorialDataService {
  constructor() {
    // Initialize localStorage with empty tutorials array if not exists
    if (!localStorage.getItem('tutorials')) {
      localStorage.setItem('tutorials', JSON.stringify([]));
    }
  }

  getAll() {
    return Promise.resolve({
      data: JSON.parse(localStorage.getItem('tutorials') || '[]')
    });
  }

  get(id) {
    const tutorials = JSON.parse(localStorage.getItem('tutorials'));
    const tutorial = tutorials.find(t => t.id === parseInt(id));
    return Promise.resolve({
      data: tutorial
    });
  }

  create(data) {
    const tutorials = JSON.parse(localStorage.getItem('tutorials'));
    const newTutorial = {
      id: Date.now(), // Use timestamp as unique ID
      ...data,
      published: false
    };
    tutorials.push(newTutorial);
    localStorage.setItem('tutorials', JSON.stringify(tutorials));
    return Promise.resolve({
      data: newTutorial
    });
  }

  update(id, data) {
    const tutorials = JSON.parse(localStorage.getItem('tutorials'));
    const index = tutorials.findIndex(t => t.id === parseInt(id));
    if (index !== -1) {
      tutorials[index] = { ...tutorials[index], ...data };
      localStorage.setItem('tutorials', JSON.stringify(tutorials));
      return Promise.resolve({
        data: tutorials[index]
      });
    }
    return Promise.reject('Tutorial not found');
  }

  delete(id) {
    const tutorials = JSON.parse(localStorage.getItem('tutorials'));
    const filteredTutorials = tutorials.filter(t => t.id !== parseInt(id));
    localStorage.setItem('tutorials', JSON.stringify(filteredTutorials));
    return Promise.resolve({
      data: null
    });
  }

  deleteAll() {
    localStorage.setItem('tutorials', JSON.stringify([]));
    return Promise.resolve({
      data: null
    });
  }

  findByTitle(title) {
    const tutorials = JSON.parse(localStorage.getItem('tutorials'));
    const filtered = tutorials.filter(t => 
      t.title.toLowerCase().includes(title.toLowerCase())
    );
    return Promise.resolve({
      data: filtered
    });
  }
}

export default new TutorialDataService();