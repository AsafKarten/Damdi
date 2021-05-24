using DamdiServer.Controllers;
using DamdiServer.DAL;
using DamdiServer.Models;
using System.Configuration;


namespace DamdiServer
{
    public static class Globals
    {
        //initializing data access layer with sql server before start the work between client side and backnd side.
        #region ctor
        static Globals()
        {
            //get connection string from Web.config;
            //var conStr = ConfigurationManager.ConnectionStrings["LocalDB"].ConnectionString;
            //var conStr = ConfigurationManager.ConnectionStrings["LIVEDNSfromLocal"].ConnectionString;
            var conStr = ConfigurationManager.ConnectionStrings["LIVEDNSfromLivedns"].ConnectionString;
            Globals.UserDAL = new DAL.UserDAL(conStr);
        }
        #endregion

        #region Controllers
        public static UserController UserController { get; set; }
        public static MedicalDonorInfoController MedicalDonorInfoController { get; set; }
        #endregion

        #region DAL
        public static UserDAL UserDAL { get; set; }
        #endregion

        #region Models
        public static User User { get; set; }
        public static MedicalInfoDonation MedicalInfoDonation { get; set; }
        #endregion

    }
}