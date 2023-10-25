using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Show
    {
        private bool _watched;

        public int Id { get; set; }
        public string ImdbId { get; set; }
        public string Title { get; set; }
        public string TitleType { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int Year { get; set; }
        public List<Season> Seasons { get; set; } = new();
        public bool Watched
        {
            get => _watched;
            set
            {
                _watched = value;
                MarkAllSeasonsWatched(value);
            }
        }

        private void MarkAllSeasonsWatched(bool watched)
        {
            foreach (var season in Seasons)
                season.Watched = watched;
        }

        public void CheckAndMarkShowWatched()
        {
            if (Seasons.All(s => s.Watched))
                Watched = true;
        }
    }
}