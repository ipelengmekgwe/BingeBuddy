using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Episode
    {
        private bool _watched;

        public int Id { get; set; }
        [ForeignKey("Season")]
        public int SeasonId { get; set; }
        public string ImdbId { get; set; }
        public int SeasonNumber { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public Season Season { get; set; }
        public bool Watched
        {
            get => _watched;
            set
            {
                _watched = value;
                Season.CheckAndMarkSeasonWatched();
                Season.Show.CheckAndMarkShowWatched();
            }
        }
    }
}
