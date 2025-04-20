import * as room from 'pixel_combats/room';
import * as basic from 'pixel_combats/basic';
import * as team from './default_team.js';
import * as timer from './default_timer.js';
import * as trigger from './library_trigger.js';

const End0fMatch_time = 11;
const waiting_players_time = 6;
const GameMode_time = timer.;
const vote_time = 16;

const winners_scores = 10000;

const game_STATEValue = 'Game';
const End0fMatch_STATEValue = 'End0fMatch';
const waiting_players_STATEValue = 'WaitingPlayers';
const LeaderBoard_PROP = 'Leader';
trigger.constants();

const main_TIMER = room.Timers.GetContext().Get('Main');
const STATEProp = room.Properties.GetContext().Get('State');
const inventory_context_blue = room.Inventory.GetContext(blue);
const inventory_context_red = room.Inventory.GetContext(red);
trigger.constants_variables();

const map_rotation = room.GameMode.Parameters.GetBool('MapRotation');
room.Properties.GetContext().GameModeName.Value = 'GameModes/ParcourTDM';
room.Damage.GetContext().FriendlyFire.Value = room.GameMode.Parameters.GetBool('FriendlyFire');
//room.Map.Rotation = map_rotation;
room.BreackGraph.OnlyPlayerBlocksDmg = room.GameMode.Parameters.GetBool('PartialDesruction');
room.BreackGraph.WeakBlocks = room.GameMode.Parameters.GetBool('LoosenBlocks');

const blueTeam = team.create_blue_team();
const redTeam = team.create_red_team();
room.Spawns.GetContext().RespawnTime.Value = 0;

function OnVoteResult(v){
 if (v.Result === null) return;
  room.NewGame.RestartGame(v.Result);
}
room.NewGameVote.OnResult.Add(OnVoteResult);

function start_vote(){
 room.NewGameVote.Start({
Variants: [{ MapId: 0 }],
Timer: vote_time
 }, mar_rotation ? 3 : 0);
   }

STATEProp.OnValue.Add(OnState);
 function OnState(){
room.Ui.GetContext().MainTimerId.Value = mainTimer.Id;
const spawn_context = room.Spawns.GetContext();
 switch (Stateroom.Value){
   case waiting_players_STATEValue:
    Ui.GetContext().Hint.Value = 'Ожидание, всех - игроков...';
    spawn_context.enable = false;
    main_TIMER.Restart(waiting_players_time);
     break;
   case game_STATEValue:
    Ui.GetContext().Hint.Value = 'Пройдите, маршрут - первым и не дайте врагу, пройти первым!';
    spawn_context.enable = true;
    main_TIMER.Restart(GameMode_time);

    inventory_context_blue.Main.Value = true;
    inventory_context_blue.Secondary.Value = true;
    inventory_context_blue.Melee.Value = true;
    inventory_context_blue.Explosive = true;

    inventory_context_red.Main.Value = true;
    inventory_context_blue.Secondary.Value = true;
    inventory_context_blue.Melee.Value = true;
    inventory_context_blue.Explosive = true;
   case  End0fMatch_STATEValue:
    Ui.GetContext().Hint.Value = 'Матч - окончен!'; 
    room.Game.GameOver(room.LeaderBoard.GetTeams());
    spawn_context.enable = false;
    spawn_context.Despawn(); 
    main_TIMER.Restart(End0fMatch_time);
     for (const win_team of leaderboard[0].Team.Teams){
			win_team.Properties.Scores.Value += winners_scores;
    }
     break; 
            }
 }

 trigger.triggers_zone_parcour();
 main_TIMER.OnTimer.Add(function(){ start_vote(); });

 room.LeaderBoard.

    

     
     

