using System.Diagnostics.CodeAnalysis;

namespace CompuTrack.DataTypes
{
    public class Comment
    {
        public string IssueGUID { get; set; }
        public string OwnerGUID { get; set; }
        public string MessageContent { get; set; }
        [AllowNull]
        public DateTime Timestamp { get; set; }

        public Comment(string IssueGUID, string OwnerGUID, string MessageContent) {
            this.IssueGUID = IssueGUID;
            this.OwnerGUID = OwnerGUID;
            this.MessageContent = MessageContent;
        }
        public Comment(string IssueGUID, string OwnerGUID, string MessageContent, DateTime Timestamp)
        {
            this.IssueGUID = IssueGUID;
            this.OwnerGUID = OwnerGUID;
            this.MessageContent = MessageContent;
            this.Timestamp = Timestamp;
        }
    }
}
