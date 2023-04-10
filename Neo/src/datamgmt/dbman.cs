﻿using Microsoft.AspNetCore.Http;
using System;
using System.Data;
using System.Data.OleDb;
using System.Diagnostics.CodeAnalysis;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Xml;

using CompuTrack;
using CompuTrack.DataTypes;
using System.Collections.Generic;
using System.Collections;
using System.Data.Common;
using CompuTrack.Pages;
using Azure;

namespace CompuTrack.src.datamgmt
{
    public class dbman
    {
        private static string DB1ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=C:\\Projects\\SRC\\JCPS\\CompuTrack\\Neo\\db\\db1.accdb";
        private static string DB2ConnectionString = "";
        #pragma warning disable CA1416 // Validate platform compatibility


        public static class Insert
        {
            public static void Issue_New(string GUID, string STATUS, int ASSETTAG, string DISPLAYTEXT, string DESCRIPTION, string USERGUID, DateTime CREATIONDATE)
            {
                Server.app.Logger.LogWarning("WARNING: Database Data Modification Detected.");
                OleDbConnection Connection = new OleDbConnection(DB1ConnectionString);
                string Query = String.Format("INSERT INTO Issues ([GUID], STATUS, ASSETTAG, DISPLAYTEXT, DESCRIPTION, USERGUID, CREATIONDATE)\nVALUES(\"{0}\", \"{1}\", {2}, \"{3}\", \"{4}\", \"{5}\", \"{6}-{7}-{8} {9}:{10}:{11}\");", GUID, STATUS, ASSETTAG, DISPLAYTEXT, DESCRIPTION, USERGUID, CREATIONDATE.Year, CREATIONDATE.Month, CREATIONDATE.Day, CREATIONDATE.Hour, CREATIONDATE.Minute, CREATIONDATE.Second);
                OleDbCommand command = new OleDbCommand(Query, Connection);
                try
                {
                    Connection.Open();
                    command.ExecuteNonQuery();
                    Connection.Close();
                    Server.app.Logger.LogInformation($"Issue Created: {DISPLAYTEXT}");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
			public static void Issue_New_withRoomNum(string GUID, string STATUS, int ASSETTAG, string DISPLAYTEXT, string DESCRIPTION, string USERGUID, DateTime CREATIONDATE, string RoomNum)
			{
				Server.app.Logger.LogWarning("WARNING: Database Data Modification Detected.");
				OleDbConnection Connection = new OleDbConnection(DB1ConnectionString);
				string Query = String.Format("INSERT INTO Issues ([GUID], STATUS, ASSETTAG, DISPLAYTEXT, DESCRIPTION, USERGUID, CREATIONDATE, Roomnum)\nVALUES(\"{0}\", \"{1}\", {2}, \"{3}\", \"{4}\", \"{5}\", \"{6}-{7}-{8} {9}:{10}:{11}\",\"{12}\");", GUID, STATUS, ASSETTAG, DISPLAYTEXT, DESCRIPTION, USERGUID, CREATIONDATE.Year, CREATIONDATE.Month, CREATIONDATE.Day, CREATIONDATE.Hour, CREATIONDATE.Minute, CREATIONDATE.Second, RoomNum);
                OleDbCommand command = new OleDbCommand(Query, Connection);
				try
				{
					Connection.Open();
					command.ExecuteNonQuery();
					Connection.Close();
					Server.app.Logger.LogInformation($"Issue Created: {DISPLAYTEXT}");
				}
				catch (Exception e)
				{
					Console.WriteLine(e);
				}
			}

            public static void Comment_New(string IssueGUID, string OwnerGUID, string MessageContent)
            {
                Server.app.Logger.LogWarning("WARNING: Database Data Modification Detected.");
                OleDbConnection Connection = new OleDbConnection(DB1ConnectionString);
                string Query = String.Format("INSERT INTO Comments (IssueGUID, OwnerGUID, MessageContent, [Timestamp])\nVALUES(\"{0}\",\"{1}\", \"{2}\", \"{3}-{4}-{5} {6}:{7}:{8}\");", IssueGUID, OwnerGUID, MessageContent, DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);

                OleDbCommand command = new OleDbCommand(Query, Connection);
                try
                {
                    Connection.Open();
                    command.ExecuteNonQuery();
                    Connection.Close();
                    Server.app.Logger.LogInformation($"Comment Created!");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }










			public static void GUID_New(string UserEmail)
            {
                Console.WriteLine("User [" + UserEmail + "] Has no GUID! Generating.....");
                var UserGUID = Guid.NewGuid();
                Console.WriteLine($"UserGUID: {UserGUID}");
                OleDbConnection Connection = new OleDbConnection(DB1ConnectionString);
                var Query = "INSERT INTO UserPrinciples(UserGUID, UserEmail)\nVALUES (\"" + UserGUID + "\",\"" + UserEmail + "\")";

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
            }
        }









        public static class Post
        {
            public static void UpdateIssue(string IssueGUID, string STATUS, string AssigneeGUID)
            {
                Server.app.Logger.LogWarning("WARNING: Database Data Modification Detected.");
                OleDbConnection Connection = new OleDbConnection(DB1ConnectionString);
                string Query = String.Format($"UPDATE Issues\nSET STATUS = \"{STATUS}\", AssigneeGUID = \"{AssigneeGUID}\"\nWHERE GUID = \"{IssueGUID}\";");
                OleDbCommand command = new OleDbCommand(Query, Connection);
                try
                {
                    Connection.Open();
                    command.ExecuteNonQuery();
                    Connection.Close();
                    Server.app.Logger.LogInformation($"Issue {IssueGUID} Updated");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
        }










        public static class Fetch
        {
            public static Comment[] Comments(string IssueGUID)
            {
                OleDbConnection connection = new OleDbConnection(DB1ConnectionString);
                string Query = $"SELECT Comments.OwnerGUID, Comments.IssueGUID, Comments.MessageContent, Comments.Timestamp\nFROM Comments\nWHERE (((Comments.IssueGUID)=\"{IssueGUID}\"))\nORDER By Timestamp desc;";
                OleDbCommand cmd = new OleDbCommand(Query, connection);

                try
                {
                    connection.Open();
                    OleDbDataReader reader = cmd.ExecuteReader();

                    List<Comment> CommentList = new List<Comment>();
                    while (reader.Read())
                    {
                        CommentList.Add(new Comment((string) reader[1], (string) reader[0], (string) reader[2], (DateTime)reader[3]));
                    }
                    reader.Close();
                    connection.Close();

                    return CommentList.ToArray();

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                return new Comment[] { };
            }
            public static Issue[] Issues()
            {
                OleDbConnection connection = new OleDbConnection(DB1ConnectionString);
                string Query = "SELECT Issues.*\nFROM Issues\nORDER BY STATUS desc;";
                OleDbCommand cmd = new OleDbCommand(Query, connection);

                try
                {
                    connection.Open();
                    OleDbDataReader reader = cmd.ExecuteReader();

                    List<Issue> IssueList = new List<Issue>();
                    while (reader.Read())
                    {
                        string assignmentguid;
                        if (reader[8] == DBNull.Value)
                        {
                            assignmentguid = "";
                        } else
                        {
                            assignmentguid = (string)reader[8];
                        }
                        IssueList.Add(new Issue((ulong)(int)reader[0], (string)reader[1], (string)reader[2], (int)reader[3], (string)reader[4], (string)reader[5], (string)reader[6], (DateTime)reader[7],  assignmentguid, (bool)reader[9], (string)reader[10]));
                    }
                    reader.Close();
                    connection.Close();

                    return IssueList.ToArray();

                } catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                return new Issue[] { };
            }
            public static UserProfile User_ByEmail(string email)
            {
				OleDbConnection connection = new OleDbConnection(DB1ConnectionString);
				string Query = "SELECT UserPrinciples.UserEmail, UserPrinciples.UserGUID, UserPrinciples.Helpdesk, UserPrinciples.Sysadmin\nFROM UserPrinciples\nWHERE(([UserPrinciples].[UserEmail]='" + email + "'));";
				OleDbCommand cmd = new OleDbCommand(Query, connection);

				try
				{
					connection.Open();
					OleDbDataReader reader = cmd.ExecuteReader();

					List<UserProfile> ProfileList = new List<UserProfile>();
					while (reader.Read())
					{
						ProfileList.Add(new UserProfile((string)reader[0], (string)reader[1], (bool)reader[2], (bool)reader[3]));
					}

					reader.Close();
					connection.Close();

					return ProfileList[0];

				}
				catch (Exception e)
				{
					Console.WriteLine(e);
				}
				return new UserProfile("Unknown", "Unknown", false, false);
			}
            public static UserProfile User(string GUID)
            {
				OleDbConnection connection = new OleDbConnection(DB1ConnectionString);
				string Query = "SELECT UserPrinciples.UserEmail, UserPrinciples.UserGUID, UserPrinciples.Helpdesk, UserPrinciples.Sysadmin\nFROM UserPrinciples\nWHERE(([UserPrinciples].[UserGUID]='" + GUID + "'));";
				OleDbCommand cmd = new OleDbCommand(Query, connection);

				try
				{
					connection.Open();
					OleDbDataReader reader = cmd.ExecuteReader();

                    List<UserProfile> ProfileList = new List<UserProfile>();
					while (reader.Read())
					{
                        ProfileList.Add(new UserProfile((string)reader[0], (string)reader[1], (bool)reader[2], (bool)reader[3])); ;
					}
					reader.Close();
					connection.Close();

                    return ProfileList[0];

				}
				catch (Exception e)
				{
					Console.WriteLine(e);
				}
                return new UserProfile("Unknown", "Unknown", false, false);
			}
        }







        





        /*
         * 
         * 
         * 
         * 
         * 
         * 
         *          LeGaCY Code ahead!
         * 
         * 
         * 
         * 
         * 
         */

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
                        UserProfile prof = new UserProfile((string)reader[0], (string)reader[1], (bool)reader[2], (bool)reader[3]);
						var ID = Response.CreateElement("Email");
                        ID.InnerText = prof.Email;
						var GUID = Response.CreateElement("GUID");
						GUID.InnerText = prof.GUID;
						userprof.AppendChild(ID);
						userprof.AppendChild(GUID);
                        var isHelpDesk = Response.CreateElement("isHelpDesk");
                        isHelpDesk.InnerText = reader[2].ToString();
						var isSysAdmin = Response.CreateElement("isSysAdmin");
                        isSysAdmin.InnerText = reader[3].ToString();
                        userprof.AppendChild(isHelpDesk);
                        userprof.AppendChild(isSysAdmin);

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