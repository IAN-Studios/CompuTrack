﻿using Microsoft.AspNetCore.Http;
using System;
using System.Data;
using System.Data.OleDb;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Xml;

using CompuTrack.DataTypes;
using System.Collections.Generic;
using System.Collections;
using System.Data.Common;
using CompuTrack.Pages;

namespace CompuTrack.src.datamgmt
{
    public class dbman
    {
        private static string DB1ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Projects\\SRC\\JCPS\\CompuTrack\\Neo\\db\\db1.accdb";
#pragma warning disable CA1416 // Validate platform compatibility
		public static void CreateNewGUIDForUser(string UserEmail)
        {
			Console.WriteLine("User [" + UserEmail + "] Has no GUID! Generating.....");
            var UserGUID = Guid.NewGuid();
            Console.WriteLine($"UserGUID: {UserGUID}");
            OleDbConnection Connection = new OleDbConnection(DB1ConnectionString);
            var Query = "INSERT INTO UserPrinciples(UserGUID, UserEmail)\nVALUES (\"" + UserGUID + "\",\""+ UserEmail + "\")";

			OleDbCommand command = new OleDbCommand(Query, Connection);
            try
            {
                Connection.Open();
				command.ExecuteNonQuery();
                Connection.Close();
			} catch (Exception e)
            {
                Console.WriteLine(e);
            }
		}






        public static void CreateNewIssue(String GUID, String STATUS, int ASSETTAG, String DISPLAYTEXT, String DESCRIPTION, string USERGUID, DateTime CREATIONDATE)
        {
			OleDbConnection Connection = new OleDbConnection(DB1ConnectionString);
            string Query = String.Format("INSERT INTO Issues ([GUID], STATUS, ASSETTAG, DISPLAYTEXT, DESCRIPTION, USERGUID, CREATIONDATE)\nVALUES(\"{0}\", \"{1}\", {2}, \"{3}\", \"{4}\", \"{5}\", \"{6}-{7}-{8} {9}:{10}:{11}\");",GUID,STATUS,ASSETTAG,DISPLAYTEXT,DESCRIPTION,USERGUID,CREATIONDATE.Year,CREATIONDATE.Month,CREATIONDATE.Day,CREATIONDATE.Hour,CREATIONDATE.Minute,CREATIONDATE.Second);
            Console.WriteLine(Query);
			OleDbCommand command = new OleDbCommand(Query, Connection);
			try
			{
				Connection.Open();
				command.ExecuteNonQuery();
				Connection.Close();
			}
			catch (Exception e)
			{
				Console.WriteLine(e);
			}
			//  INSERT INTO Issues (Issues.GUID, Issues.STATUS, Issues.ASSETTAG, Issues.DISPLAYTEXT, Issues.DESCRIPTION, Issues.USERGUID, Issues.CREATIONDATE)
			//  VALUES("aaa", "bbb", 999, "ddd", "eee", "fff", "2023-3-5 9:00:00");
		}






        public static XmlDocument FetchData(string Databasenumber, string Query, int QueryColumnCount, string QueryType)
        {
            XmlDocument Response = new XmlDocument();
            Response.CreateXmlDeclaration("1.1", "utf-8", "no");
            OleDbConnection Connection;
            

            if (Databasenumber == "DB1")
            {
                Connection = new OleDbConnection(DB1ConnectionString);
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
						Issue Issue = new Issue((ulong)(int)reader[0], (string)reader[1], (string)reader[2], (int) reader[3], (string)reader[4], (string)reader[5], (string)reader[6], (DateTime)reader[7]);
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
                        IssueElem.AppendChild(ID);
						IssueElem.AppendChild(GUID);
						IssueElem.AppendChild(status);
                        IssueElem.AppendChild(assettag);
                        IssueElem.AppendChild(displaytext);
                        IssueElem.AppendChild(description);
                        IssueElem.AppendChild(userguid);
                        IssueElem.AppendChild(creationdate);
					}
                    reader.Close();
					Connection.Close();
				}
                else if (QueryType == "ISSUE")
                {

                }
                else if (QueryType == "USERPROFILE")
                {
					XmlElement userprof = Response.CreateElement("UserProfile");
					Response.AppendChild(userprof);

					while (reader.Read())
					{
                        UserProfile prof = new UserProfile((string)reader[0], (string)reader[1]);
						var ID = Response.CreateElement("Email");
                        ID.InnerText = prof.Email;
						var GUID = Response.CreateElement("GUID");
						GUID.InnerText = prof.GUID;
						userprof.AppendChild(ID);
						userprof.AppendChild(GUID);
					}
					reader.Close();
					Connection.Close();
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