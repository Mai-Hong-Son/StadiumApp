/**
 * @providesModule WeFit.Components.Reusables.Loadings.styles
 */

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loadingListRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  loadingOverlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  
  emptyMessage: {
    textAlign: 'center',
    color: '#292941',
    fontSize: 17,

    // Extra
    marginVertical: 20,
  }
});
