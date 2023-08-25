  /**
   * Displays an error notification for an invalid command.
   *
   * @param {string} command - The invalid command.
   */
 function errorNotification(command) {
    let ls;

    if (command !== undefined) {
      if (command.length > 18) {
        ls = spawn("echo", [
          "",
          `\x1b[5m\x1b[31m '${command.slice(0, 18)}...' is not a valid command.\x1b[0m\x1b[0m`
        ]);
      } else {
        ls = spawn("echo", [
          "",
          `\x1b[5m\x1b[31m '${command.slice(0, 18)}' is not a valid command.\x1b[0m\x1b[0m`
        ]);
      }
      ls.stdout.on("data", (data) => {
        if (command !== undefined) {
          console.log(this.invalidCommand(data));
        }
        console.log();
        console.log(`Some Available Options:
          man - for the man page.
          methods - for available method lists.
          help - for the help page.
          events - for available events.
          database - for connected database.
          model - for available models or collections.
          class - for main class.
      `);
      });

      ls.stderr.on("data", (data) => { });

      ls.on("close", (code) => { });
    } else {
      console.log(`Some Available Options:
          man - for the man page.
          methods - for available method lists.
          help - for the help page.
          events - for available events.
          database - for connected database.
          model - for available models or collections.
          class - for main class.
    `);
    }
  }

  /**
   * The `errorNotification()` function displays an error notification for an invalid command.
   * It accepts a parameter `command` which represents the invalid command.
   * Customize the logic and displayed messages based on your specific requirements.
   */

  function commandz() {

    // // const {BIRed} = new Couleur
    // if(!this.command(2) || this.command(2).trim().length === 0){
    //   new Man({ command: this.command(2) }).man("man");
    // }else{
    //   switch (this.command(2)) {
    //     case "h":
    //       new Man({ command: this.command(2) }).man("man");
    //       break;
    //     case "help":

    //       new Man({ command: this.command(2) }).man("man");
    //       break;
    //     case "--help":

    //       new Man({ command: this.command(2) }).man("man");
    //       break;
    //     case "cli":
    //        new ModelCli()
    //       break;
    //     case "-h":
    //       new Man({ command: this.command(2) }).man("man");
    //       break;
    //     case "man":

    //       new Man({ command: this.command(2) }).man("man");
    //       break;
    //     case "--man":
    //       new Man({ command: this.commands(2) }).man("man");
    //       break;
    //     // case "method":
    //     //   new MethodCommand().method()
    //     //   break;
    //     case "models":
    //       //console.log('models')
    //       new ModelCommand().list()
    //       break;
    //     case "make:model":

    //      const {makeModel} = new ModelCommand
    //       makeModel();
    //       // console.log('make:model', makeModel);
    //       break;
    //     case "make:schema":
    //       // console.log('make:schma')
    //         const  {makeSchema, hasType} =  new Schema({command: this.command(2)})
    //         if(this.command(4)){
    //             if(hasType(this.command(4))){
    //               makeSchema(this.command(3), this.command(4));
    //             }else{
    //               console.log(`invalid argument for make:schema ${this.command(3)}`);
    //             }

    //         }else{
    //           makeSchema(this.command(3));
    //         }

    //       break;
    //     case "make:migration":
    //       //console.log('make migration')
    //       //new MigrationCommand().makeMigration()
    //       if(this.command(3)){
    //         const  {makeMigration, hasType} =  new Migration({command: this.command(2)})
    //         if(this.command(4)){
    //             if(hasType(this.command(4))){
    //               makeMigration(this.command(3), this.command(4));
    //             }else{
    //               console.log(`invalid argument for make:migration ${this.command(3)}`);
    //             }
    //         }else{
    //           makeMigration(this.command(3));
    //         }
    //        }else{
    //         console.log('make:migration command adfdasf', this.command(3));
    //        }
    //       break;
    //     // case "migrate":

    //     // console.log('migrate')
    //     //   //new MigrateCommand().migrate();
    //     //   break;
    //     case "migrate":
    //       const {migrate, migrateSchema, migrateMigration, migrateAll} = new Migrate({command: this.command(2)})
    //         if(this.command(3)){
    //           if(this.command(3).startsWith('--schema=')){
    //             migrateSchema(this.command(3))
    //             migrateMigration(this.command(3))
    //           }else{
    //             console.log(`invalid argument. Must be like --schema=<Schema Name>`);
    //           }
    //         }else{
    //           migrateAll(this.command(2))
    //         }
    //       break;
    //     case "--model=":
    //         console.log('--model=')
    //       break;
    //     case "-M":
    //         console.log('-M')
    //       break;
    //     default:
    //       console.log('detaults')
    //       // new Man({ command: this.commands(2) }).man("man");
    //       //console.log(BIRed(`${this.commands(2)} is not command`));
    //       break;
    //   }
    // }
  }
