"use server";

import Card from '../components/Shared/Card'
const MAX_LIMIT = 8;

export async function fetchCard(page) {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=popularity`
  );

  const data = await response.json();

  return data.map((anime, index) => (
    <Card key={anime.id} anime={anime} index={index} />
  ));
}
