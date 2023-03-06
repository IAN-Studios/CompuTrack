using System;
using System.Xml;
using System.Text;
using CompuTrack.Pages;
using System.Web;
using CompuTrack.DataTypes;
using CompuTrack.src.datamgmt;


namespace CompuTrack.src.Client
{
	public class Utf8StringWriter : StringWriter
	{
		public override Encoding Encoding
		{
			get { return Encoding.UTF8; }
		}
	}
	public class Data
	{
		public static DataType[] Fetch()
		{
			StringWriter sw = new Utf8StringWriter();
			XmlWriter xw = XmlWriter.Create(sw);
			dbman.FetchData("DB1", "SELECT Issues.*\nFROM Issues;", 9, "ISSUELIST").WriteContentTo(xw);
			xw.Close();
			return new DataType[] { };
		}
	}
}
