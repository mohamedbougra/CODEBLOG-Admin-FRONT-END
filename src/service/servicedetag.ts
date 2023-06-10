import axiosInstance from '../http-request/axios'; // Importer votre instance d'axios existante

// URL de base de l'API
const BASE_URL = '/api/tags';

// Service frontend pour les opérations de gestion de tags
const tagService = {
  // Créer un tag
  createTag(tag: any) {
    return axiosInstance.post(BASE_URL, tag);
  },

  // Récupérer un tag par ID
  getTagById(tagId: any) {
    return axiosInstance.get(`${BASE_URL}/${tagId}`);
  },

  // Récupérer tous les tags
  getAllTags() {
    return axiosInstance.get(BASE_URL);
  },

  // Supprimer un tag par ID
  deleteTag(tagId: any) {
    return axiosInstance.delete(`${BASE_URL}/${tagId}`);
  }
};

export default tagService;
