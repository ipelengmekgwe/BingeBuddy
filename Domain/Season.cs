using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Season
    {
        private bool _watched;

        public int Id { get; set; }
        [ForeignKey("Show")]
        public int ShowId { get; set; }
        public int SeasonNumber { get; set; }
        public List<Episode> Episodes { get; set; } = new();
        public Show Show { get; set; }
        public bool Watched
        {
            get => _watched;
            set
            {
                _watched = value;
                MarkAllEpisodesWatched(value);
            }
        }

        private void MarkAllEpisodesWatched(bool watched)
        {
            foreach (var episode in Episodes)
                episode.Watched = watched;
        }

        public void CheckAndMarkSeasonWatched()
        {
            if (Episodes.All(e => e.Watched))
                Watched = true;
        }
    }
}
