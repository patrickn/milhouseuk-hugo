---
title: "Logging with Boost Log"
date: 2018-03-01
tags: [C++, Boost]
draft: true
---


logger.h

```
//-----------------------------------------------------------------------------
#pragma once
//-----------------------------------------------------------------------------
#include <boost/log/expressions.hpp>
#include <boost/log/sources/global_logger_storage.hpp>
#include <boost/log/support/date_time.hpp>
#include <boost/log/trivial.hpp>
#include <boost/log/utility/setup.hpp>
//-----------------------------------------------------------------------------

// Define our severity levels
enum severity_level
{
   debug,
   message,
   info,
   warning,
   error,
   fatal
};

void init_console(const severity_level threshold);
void init_logfile(const severity_level threshold, const std::string& logfilename);

//-----------------------------------------------------------------------------
// Register a global logger
BOOST_LOG_GLOBAL_LOGGER(my_logger, boost::log::sources::severity_logger_mt<severity_level>)

//-----------------------------------------------------------------------------
// This operator is used for regular stream formatting
std::ostream& operator<<(std::ostream& strm, severity_level level);

//-----------------------------------------------------------------------------
// This operator is used when putting the severity level to log
boost::log::formatting_ostream& operator<<(
   boost::log::formatting_ostream& strm,
   boost::log::to_log_manip<severity_level> const& manip);

//-----------------------------------------------------------------------------
// Helper macros
#define DEBUG   BOOST_LOG_SEV(my_logger::get(), debug)
#define MESSAGE BOOST_LOG_SEV(my_logger::get(), message)
#define INFO    BOOST_LOG_SEV(my_logger::get(), info)
#define WARNING BOOST_LOG_SEV(my_logger::get(), warning)
#define ERROR   BOOST_LOG_SEV(my_logger::get(), error)
#define FATAL   BOOST_LOG_SEV(my_logger::get(), fatal)
```


logger.cpp

```
//-----------------------------------------------------------------------------
#include <boost/log/sources/global_logger_storage.hpp>
#include <boost/log/sources/severity_logger.hpp>
#include <fstream>
#include "logger.h"
//-----------------------------------------------------------------------------

namespace attrs = boost::log::attributes;
namespace expr  = boost::log::expressions;

BOOST_LOG_ATTRIBUTE_KEYWORD(severity, "Severity", severity_level)

BOOST_LOG_GLOBAL_LOGGER_INIT(my_logger, boost::log::sources::severity_logger_mt)
{
   boost::log::sources::severity_logger_mt<severity_level> my_logger;

   boost::log::add_common_attributes();
   return my_logger;
}

//-----------------------------------------------------------------------------
// This operator is used for regular stream formatting
std::ostream& operator<<(std::ostream& strm, severity_level level)
{
   static const char* strings[] =
   {
      "debug",
      "message",
      "info",
      "warning",
      "error",
      "fatal",
   };

   if (static_cast<std::size_t>(level) < sizeof(strings) / sizeof(*strings))
      strm << strings[level];
   else
      strm << static_cast<int>(level);

   return strm;
}

//-----------------------------------------------------------------------------
// This operator is used when putting the severity level to log
boost::log::formatting_ostream& operator<<(
   boost::log::formatting_ostream& strm,
   boost::log::to_log_manip<severity_level> const& manip) {

   static const char* strings[] =
   {
      "[debug]   ",
      "[message] ",
      "[info]    ",
      "[warning] ",
      "[error]   ",
      "[fatal]   "
   };

   severity_level level = manip.get();
   if (static_cast<std::size_t>(level) < sizeof(strings) / sizeof(*strings))
      strm << strings[level];
   else
      strm << static_cast<int>(level);

   return strm;
}

//-----------------------------------------------------------------------------
// Initialize console logger
void init_console(const severity_level threshold)
{
   boost::log::add_console_log(
      std::clog,
      boost::log::keywords::filter = severity >= threshold,
      boost::log::keywords::format = (
              expr::stream << "[" << expr::format_date_time<boost::posix_time::ptime>("TimeStamp", "%Y-%m-%d %H:%M:%S.%f") << "] "
                           << "[" << expr::attr<attrs::current_thread_id::value_type>("ThreadID") << "] "
                           << expr::attr<severity_level>("Severity")
                           << expr::smessage
      )
   );
}

//-----------------------------------------------------------------------------
// Initialize logfile
void init_logfile(const severity_level threshold, const std::string& logfilename)
{
   boost::log::add_file_log(
      boost::log::keywords::file_name = logfilename,
      boost::log::keywords::filter = severity >= threshold,
      boost::log::keywords::rotation_size = 10 * 1024 * 1024,                                               // rotate files every 1 MiB
      boost::log::keywords::time_based_rotation = boost::log::sinks::file::rotation_at_time_point(0, 0, 0), // ...or at midnight
      boost::log::keywords::auto_flush = true,
      boost::log::keywords::format = (
              expr::stream << "[" << expr::format_date_time<boost::posix_time::ptime>("TimeStamp", "%Y-%m-%d %H:%M:%S.%f") << "] "
                           << "[" << expr::attr<attrs::current_thread_id::value_type>("ThreadID") << "] "
                           << expr::attr<severity_level>("Severity")
                           << expr::smessage
      )
   );
}
```


CMakeLists.txt

```
cmake_minimum_required(VERSION 3.7)

project(boost-log)

set(SOURCES main.cpp logger.cpp)

# Boost
add_definitions(-DBOOST_ALL_DYN_LINK)
find_package(Boost COMPONENTS log_setup log)

if(Boost_FOUND)
  add_executable(${PROJECT_NAME} ${SOURCES})
  target_link_libraries(${PROJECT_NAME} Boost::log_setup Boost::log)
endif()
```




main.cpp

```
//-----------------------------------------------------------------------------
#include "logger.h"
//-----------------------------------------------------------------------------

int main()
{
   init_console(debug);
   init_logfile(debug, "debug.log");


   DEBUG   << "This is severity level: " << debug;
   MESSAGE << "This is severity level: " << message;
   INFO    << "This is severity level: " << info;
   WARNING << "This is severity level: " << warning;
   ERROR   << "This is severity level: " << error;
   FATAL   << "This is severity level: " << fatal;

   return 0;
}
```




    [2018-03-01 18:42:51.955457] [0x00007fd2aac3d740] [debug]   Severity level: debug
    [2018-03-01 18:42:51.955918] [0x00007fd2aac3d740] [message] Severity level: message
    [2018-03-01 18:42:51.956005] [0x00007fd2aac3d740] [info]    Severity level: info
    [2018-03-01 18:42:51.956061] [0x00007fd2aac3d740] [warning] Severity level: warning
    [2018-03-01 18:42:51.956110] [0x00007fd2aac3d740] [error]   Severity level: error
    [2018-03-01 18:42:51.956158] [0x00007fd2aac3d740] [fatal]   Severity level: fatal
