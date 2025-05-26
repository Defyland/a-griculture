// Ce fichier contient les réexportations pour assurer la compatibilité des types de formulaires

// Exporter FormErrors pour permettre un accès facile depuis n'importe quel import
export type { FormErrors } from './form';

// Fournir des alias pour tous les types de formulaire
export type { 
  PropriedadeFormValues, 
  PropriedadeFormErrors,
  SafraFormValues,
  SafraFormErrors,
  ProdutorFormValues,
  ProdutorFormErrors
} from './form'; 