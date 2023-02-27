using Microsoft.AspNetCore.Http;
using System;
using System.Data;
using System.Data.OleDb;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Xml;

using CompuTrack.DataTypes;

namespace CompuTrack.src.datamgmt
{
    public class dbman
    {
#pragma warning disable CA1416 // Validate platform compatibility

        public static XmlDocument FetchData(string Databasenumber, string Query, int QueryColumnCount, string QueryType)
        {
            XmlDocument Response = new XmlDocument();
            Response.CreateXmlDeclaration("1.1", "utf-8", "no");
            OleDbConnection Connection;
            

            if (Databasenumber == "DB1")
            {
                Connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Projects\\SRC\\JCPS\\CompuTrack\\Neo\\db\\db1.accdb");
            }
            else if (Databasenumber == "DB2")
            {
                Connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Projects\\SRC\\JCPS\\CompuTrack\\Neo\\db\\DB2.accdb;Persist Security Info=True");
            }
            else throw new ArgumentException();
            
            try 
            {
                Connection = new OleDbConnection("Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Projects\\SRC\\JCPS\\CompuTrack\\Neo\\db\\db1.accdb");
                OleDbCommand command = new OleDbCommand(Query, Connection);
                Connection.Open();
                OleDbDataReader reader = command.ExecuteReader();
                if (QueryType == "ISSUELIST")
                {
                    XmlElement IssueList = Response.CreateElement("IssueList");
                    Response.AppendChild(IssueList);

                    while (reader.Read())
                    {
						Issue Issue = new Issue((ulong)(int)reader[0], (string)reader[1], (string)reader[2], (int) reader[3], (string)reader[4], (string)reader[5], (string)reader[6], (DateTime)reader[7], (DateTime)reader[8]);
						var IssueElem = Response.CreateElement("Issue");
						IssueList.AppendChild(IssueElem);
                        var ID = Response.CreateElement("ID");
                            ID.InnerText = ((int)Issue.ID).ToString();
                        var GUID = Response.CreateElement("GUID");
                            GUID.InnerText = Issue.GUID;
                        var status = Response.CreateElement("STATUS");
                            status.InnerText = Issue.STATUS;
                        var assettag = Response.CreateElement("ASSETTAG");
                            assettag.InnerText = ((int)Issue.ASSETTAG).ToString();
                        var displaytext = Response.CreateElement("DISPLAYTEXT");
                            displaytext.InnerText = Issue.DISPLAYTEXT;
                        var description = Response.CreateElement("DESCRIPTION");
                            description.InnerText = Issue.DESCRIPTION;
                        var userguid = Response.CreateElement("USERGUID");
                            userguid.InnerText = Issue.USERGUID;
                        var creationdate = Response.CreateElement("CREATIONDATE");
                            creationdate.InnerText = Issue.CREATIONDATE.ToString();
                        var creationtime = Response.CreateElement("CREATIONTIME");
                            creationtime.InnerText = Issue.CREATIONTIME.ToString();
                        IssueElem.AppendChild(ID);
						IssueElem.AppendChild(GUID);
						IssueElem.AppendChild(status);
                        IssueElem.AppendChild(assettag);
                        IssueElem.AppendChild(displaytext);
                        IssueElem.AppendChild(description);
                        IssueElem.AppendChild(userguid);
                        IssueElem.AppendChild(creationdate);
                        IssueElem.AppendChild(creationtime);
					}
                    reader.Close();
					Connection.Close();
				}
                else if (QueryType == "ISSUE")
                {

                }
                else if (QueryType == "USERPROFILE")
                {

                }
                else if (QueryType == "SETTINGS")
                {
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return Response;
        }
    }
}

#pragma warning restore CA1416 // Validate platform compatibility