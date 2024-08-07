import { DATA } from "@/data/data.js";
import { validators } from "@/model/validators";

// AVG Views Metrics
const avgMetrics = {
  avgYouTubeViews: 0 /* 375826861.0397826 */,
  avgTikTokViews: 0 /* 436397148.101087 */,
  avgDeezerPlayListReach: 0 /* 1033698.922826087 */,
  avgSpotifyStreams: 0 /* 4089646.953043478*/,
  avgSoundCloudStreams: 0 /* 375826861.0397826 */,
};

const youTubeViews: number[] = [];
const tikTokViews: number[] = [];
const deezerPlayListsReach: number[] = [];
const spotifyStreams: number[] = [];
const soundCloudStreams: number[] = [];

DATA.map((dataItem) => {
  youTubeViews.push(validators.numberaze(dataItem.YouTubeViews));
  tikTokViews.push(validators.numberaze(dataItem.TikTokViews));
  deezerPlayListsReach.push(validators.numberaze(dataItem.DeezerPlaylistReach));
  spotifyStreams.push(validators.numberaze(dataItem.SpotifyStreams));
  soundCloudStreams.push(validators.numberaze(dataItem.SoundcloudStreams));
});

avgMetrics.avgYouTubeViews = Math.floor(
  youTubeViews.reduce((a, b) => a + b, 0) / youTubeViews.length
);
avgMetrics.avgTikTokViews = Math.floor(tikTokViews.reduce((a, b) => a + b, 0) / tikTokViews.length);
avgMetrics.avgDeezerPlayListReach = Math.floor(
  deezerPlayListsReach.reduce((a, b) => a + b, 0) / deezerPlayListsReach.length
);
avgMetrics.avgSpotifyStreams = Math.floor(
  spotifyStreams.reduce((a, b) => a + b, 0) / spotifyStreams.length
);
avgMetrics.avgSoundCloudStreams = Math.floor(
  soundCloudStreams.reduce((a, b) => a + b, 0) / soundCloudStreams.length
);

// TRACK INDEXES (AVG veiws / current song veiws at Platform)
const tracksIndexes: {
  track?: string;
  ISRC?: string;
  youTubeIndex?: number;
  tikTokIndex?: number;
  deezerIndex?: number;
  spotifyIndex?: number;
  soundCloudIndex?: number;
}[] = [];

DATA.map((dataItem) => {
  tracksIndexes.push({
    track: `${dataItem.Track}`,
    ISRC: `${dataItem.ISRC}`,
    youTubeIndex: avgMetrics.avgYouTubeViews / validators.numberaze(dataItem.YouTubeViews),
    tikTokIndex: avgMetrics.avgTikTokViews / validators.numberaze(dataItem.TikTokViews),
    deezerIndex:
      avgMetrics.avgDeezerPlayListReach / validators.numberaze(dataItem.DeezerPlaylistReach),
    spotifyIndex: avgMetrics.avgSpotifyStreams / validators.numberaze(dataItem.SpotifyStreams),
    soundCloudIndex:
      avgMetrics.avgSoundCloudStreams / validators.numberaze(dataItem.SoundcloudStreams),
  });
});

// DATA to render Points
const pointsCoordinatesDelta: {
  x: number;
  y: number;
  ISRC: string;
  size: number;
  releaseYear: string;
  artist: string;
  track: string;
}[] = [];

DATA.map((item) => {
  if (item.YouTubeViews !== "" && item.TikTokViews !== "") {
    const y =
      ((validators.numberaze(item.YouTubeViews) - avgMetrics.avgYouTubeViews) *
        validators.numberaze(item.YouTubeLikes)) /
      validators.numberaze(item.YouTubeViews);
    const x =
      ((validators.numberaze(item.TikTokViews) - avgMetrics.avgTikTokViews) *
        validators.numberaze(item.TikTokLikes)) /
      validators.numberaze(item.TikTokViews);
    const ISRC = item.ISRC;
    const popularityIdx = validators.numberaze(item.SpotifyPopularity) / 30;
    const releaseYear = item.ReleaseDate.slice(-4);
    const artist = item.Artist;
    const track = item.Track;

    pointsCoordinatesDelta.push({
      x: Math.floor(x / 10 ** 5),
      y: Math.floor(y / 10 ** 4),
      size: popularityIdx,
      track,
      ISRC,
      releaseYear,
      artist,
    });
  }
});

export { avgMetrics, tracksIndexes, pointsCoordinatesDelta };
