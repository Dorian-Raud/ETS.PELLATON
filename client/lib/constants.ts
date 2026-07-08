export const MAX_IMAGE_SIZE_MB = 8;
export const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

// URL canonique du site (sans slash final). `||` et non `??` pour couvrir
// aussi le cas d'une variable définie mais vide.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://etspellaton.com";

export const SITE_NAME = "Ets. Pellaton";

export const SITE_DESCRIPTION =
  "Ets. Pellaton, cabinet de conseil indépendant en art moderne et contemporain fondé par Maxime Pellaton : accompagnement d'acquisitions, gestion de collections, valorisation d'œuvres et découverte d'artistes émergents. Basé sur la Côte d'Azur, en France et à l'international.";
