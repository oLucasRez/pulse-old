//---------------------------------------------------------------< components >
import { DicesDisplayerLayer } from "../DicesDisplayerLayer";
import { PulsesDisplayerLayer } from "../PulsesDisplayerLayer";
import { TextareaLayer } from "../TextareaLayer";
import { DiceRollerLayer } from "../DiceRollerLayer";
import { PulseCreatorLayer } from "../PulseCreatorLayer";
//------------------------------------------------------------------< helpers >
import { mult, norm, sub, sum, zero } from "../../helpers/vectorHelper";
//--------------------------------------------------------------------< types >
import { IPlayersContext } from "../../contexts/PlayersContext";
import { IDicesContext } from "../../contexts/DicesContext";
import { IPulsesContext } from "../../contexts/PulsesContext";
import { IPlayer } from "../../types/IPlayer";
import { IDice } from "../../types/IDice";
import { IDispatcher } from "../../types/IDispatcher";
import { IPulse } from "../../types/IPulse";
import { NoteCreatorLayer } from "../NoteCreatorLayer";
import { INote } from "../../types/INote";
import { INotesContext } from "../../contexts/NotesContext";
export interface IContext {
  playersContext: IPlayersContext;
  dicesContext: IDicesContext;
  pulsesContext: IPulsesContext;
  notesContext: INotesContext;
  currentPlayer: IPlayer;
  nextPlayer: (clockwise: -1 | 1) => void;
  memoDice: IDice;
  setMemoDice: IDispatcher<IDice>;
  setState: IDispatcher<IState>;
}
export interface IState {
  handleRollStop?(ctx: IContext, dice: IDice): void;
  handlePulseCreate?(ctx: IContext, pulse: IPulse): void;
  handleStepFinish?(ctx: IContext): void;
  handleText?(ctx: IContext, text: string): void;
  draw(ctx: IContext): JSX.Element;
}
//==============================================[ < InitialPositioningState > ]
export class InitialPositioningState implements IState {
  public handleRollStop(ctx: IContext, dice: IDice) {
    const {
      pulsesContext,
      dicesContext,
      currentPlayer,
      setState,
      setMemoDice,
    } = ctx;
    const { getPulse, updatePulse } = pulsesContext;
    const { updateDice } = dicesContext;

    // const mainAmount = getPulse("foreground")?.amount ?? 0;
    const mainAmount = getPulse("foreground").amount;
    updatePulse("foreground", {
      amount: mainAmount < dice.value ? dice.value : mainAmount,
    });
    const mainPulse = getPulse("foreground");

    if (!mainPulse) return;

    const distPulseDice = sub(dice.origin ?? zero, mainPulse.origin);
    const dicePositionMag = dice.value * mainPulse.gap;
    const relDicePosition = mult(norm(distPulseDice), dicePositionMag);
    const absDicePosition = sum(relDicePosition, mainPulse.origin);

    updateDice(currentPlayer.color, {
      origin: absDicePosition,
      value: dice.value,
    });

    setMemoDice(dice);

    setState(new DefineObjectsState());
  }

  public draw(ctx: IContext) {
    const { dicesContext, currentPlayer } = ctx;
    const { getDice } = dicesContext;

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <DiceRollerLayer
          dice={getDice(currentPlayer.color)}
          onRollStop={(dice) => this.handleRollStop(ctx, dice)}
        />
      </>
    );
  }
}
//===================================================[ < DefineObjectsState > ]
class DefineObjectsState implements IState {
  public handleText(ctx: IContext, text: string) {
    const { playersContext, nextPlayer, setState, memoDice } = ctx;
    const { updatePlayer } = playersContext;

    updatePlayer(memoDice.color, { object: text });

    setState(new InitialPositioningState());

    nextPlayer(1);
  }

  public handleStepFinish(ctx: IContext) {
    const { setState } = ctx;

    setState(new FirstPulsesRollState());
  }

  public draw(ctx: IContext) {
    const { dicesContext, currentPlayer } = ctx;
    const { getDice } = dicesContext;

    const dice = getDice(currentPlayer.color);

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <TextareaLayer
          dice={dice}
          onText={(text) => this.handleText(ctx, text)}
        />
      </>
    );
  }
}
//=================================================[ < FirstPulsesRollState > ]
class FirstPulsesRollState implements IState {
  public handleRollStop(ctx: IContext, dice: IDice) {
    const { dicesContext, setMemoDice, setState } = ctx;
    const { updateDice } = dicesContext;

    setMemoDice(dice);
    updateDice(dice.color, { value: dice.value });
    setState(new FirstPulsesDrawState());
  }

  public draw(ctx: IContext) {
    const { dicesContext, currentPlayer } = ctx;
    const { getDice } = dicesContext;

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <DiceRollerLayer
          dice={{ ...getDice(currentPlayer.color), value: 0 }}
          onRollStop={(dice) => this.handleRollStop(ctx, dice)}
        />
      </>
    );
  }
}
//=================================================[ < FirstPulsesDrawState > ]
class FirstPulsesDrawState implements IState {
  public handlePulseCreate(ctx: IContext) {
    const { nextPlayer, setState } = ctx;

    setState(new FirstPulsesRollState());

    nextPlayer(-1);
  }

  public handleStepFinish(ctx: IContext) {
    const { setState } = ctx;

    setState(new DefineMainFactState());
  }

  public draw(ctx: IContext) {
    const { memoDice } = ctx;

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <PulseCreatorLayer
          pulseTrackable
          crossingTrackable
          dice={memoDice}
          onPulseCreated={() => this.handlePulseCreate(ctx)}
        />
      </>
    );
  }
}
//==================================================[ < DefineMainFactState > ]
class DefineMainFactState implements IState {
  public handleText(ctx: IContext, text: string) {
    const { playersContext, nextPlayer, setState, memoDice } = ctx;
    const { updatePlayer } = playersContext;

    updatePlayer(memoDice.color, { object: text });

    setState(new InitialPositioningState());

    nextPlayer(1);
  }

  public handleStepFinish(ctx: IContext) {
    const { setState } = ctx;

    setState(new FirstPulsesRollState());
  }

  handleNote(ctx: IContext, note: INote) {}

  public draw(ctx: IContext) {
    const { pulsesContext } = ctx;
    const { getPulse } = pulsesContext;

    const pulse = getPulse("foreground");

    return (
      <>
        <PulsesDisplayerLayer />
        <DicesDisplayerLayer />
        <NoteCreatorLayer
          from={pulse.origin}
          color={pulse.color}
          onNote={(note) => this.handleNote(ctx, note)}
        />
      </>
    );
  }
}
