import debounce from "../utils/debounce.js";
import { createElements } from "./dom.js";

const Library = () => {
  let $root = undefined;
  let $rootComponent = undefined;

  let states = [];
  let idx = 0;

  const useEffect = (callback, dependencies) => {
    const _idx = idx;
    const prev = states[_idx];
    let isChanged = true;

    if (prev) {
      isChanged = dependencies.some((dep, i) => !Object.is(dep, prev[i]));
    }

    if (isChanged) {
      callback();
      states[_idx] = dependencies;
    }

    idx++;
  };

  const useMemo = (callback, dependencies) => {
    const _idx = idx;
    const [prevState, prevMemo] = [states[_idx]];
    let isChanged = true;
    let memo = prevMemo;

    if (prevState) {
      isChanged = dependencies.some((dep, i) => !Object.is(dep, prevState[i]));
    }

    if (isChanged) {
      memo = callback();
      states[_idx] = [dependencies, memo];
    }

    idx++;

    return memo;
  };

  const useState = (initState) => {
    const _idx = idx;
    const state = states[idx] || initState;

    const setState = (newState) => {
      if (states[_idx] === newState) return;
      if (JSON.stringify(states[_idx]) === JSON.stringify(newState)) return;

      states[_idx] = newState;
      _render();
    };

    idx++;

    return [state, setState];
  };

  const _render = debounce(() => {
    if (!$root || !$rootComponent) return;

    if ($root instanceof HTMLElement) {
      $root.innerHTML = "";
      $root.appendChild(createElements($rootComponent()));
      idx = 0;

      console.log("render");
    }
  });

  const render = (component, root) => {
    $root = root;
    $rootComponent = component;
    _render();
  };

  return { render, useEffect, useState, useMemo };
};

export const { useState, render, useEffect, useMemo } = Library();
