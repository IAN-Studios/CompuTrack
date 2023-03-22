using Microsoft.AspNetCore.Html;
using System.Text.RegularExpressions;

namespace CompuTrack.src
{
    public class alerts
    {
        public static alert[] alertlist = new alert[]
        {
            new alert("YELLOW", "Note: As of February 22nd, 2023, Computrack is in stage Development/NEO and will be periodically online and offline."),
            new alert("GREEN", "Computrack has been Updated to Version [v2.1][BETA]. See the Full Changelog There =>", "https://github.com/IAN-Studios/CompuTrack/releases/tag/v2.1-beta")
        };
    }
    public class alert
    {
        public string message;
        public string bkcolor;
        public string bdrcolor;
        public string imagesrc;
        public string LearnMoreURL = "NaN";

        public alert(string colorscheme, string message)
        {
            this.message = message;

            this.bkcolor = "purple";
            this.bdrcolor = "black";
            this.imagesrc = "issue-blue.png";

            if (colorscheme == "RED")
            {
                this.bkcolor = "red";
                this.bdrcolor = "#ff6969";
                this.imagesrc = "issue-red.png";
            } else
            if (colorscheme == "YELLOW")
            {
                this.bkcolor = "yellow";
                this.bdrcolor = "#ddff73";
                this.imagesrc = "issue-yellow.png";
            } else
            if (colorscheme == "GREEN")
            {
                this.bkcolor = "green";
                this.bdrcolor = "#38c95f";
                this.imagesrc = "issue-green.png";
            } else
            if (colorscheme == "BLUE")
            {
                this.bkcolor = "blue";
                this.bdrcolor = "#5c62cc";
                this.imagesrc = "issue-blue.png";
            } else
            {
                this.message = "ERROR";
            }
        }
        public alert(string colorscheme, string message, string LearnMoreURL)
        {
            this.message = message;

            this.bkcolor = "purple";
            this.bdrcolor = "black";
            this.imagesrc = "issue-blue.png";

            if (colorscheme == "RED")
            {
                this.bkcolor = "red";
                this.bdrcolor = "#ff6969";
                this.imagesrc = "issue-red.png";
            }
            else
            if (colorscheme == "YELLOW")
            {
                this.bkcolor = "yellow";
                this.bdrcolor = "#ddff73";
                this.imagesrc = "issue-yellow.png";
            }
            else
            if (colorscheme == "GREEN")
            {
                this.bkcolor = "green";
                this.bdrcolor = "#38c95f";
                this.imagesrc = "issue-green.png";
            }
            else
            if (colorscheme == "BLUE")
            {
                this.bkcolor = "blue";
                this.bdrcolor = "#5c62cc";
                this.imagesrc = "issue-blue.png";
            }
            else
            {
                this.message = "ERROR";
            }
            this.LearnMoreURL = LearnMoreURL;
        }
    }
}
